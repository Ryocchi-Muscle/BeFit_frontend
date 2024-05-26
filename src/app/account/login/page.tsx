"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      toast({
        title: "今日もトレーニング頑張ろう！！",
        duration: 3000,
        style: { backgroundColor: "green", color: "white" },
      });
      setTimeout(() => router.push("/category/record"), 3200);
      redirect("/category/record");
    }
  }, [session, status, toast, router]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    const result = await signIn(provider);

    // ログインに成功したらTOPページにリダイレクト
    if (result) {
      redirect("/category/record");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
        <div className="text-center">
          {/* <img
            src="/path/to/logo.png"
            alt="TechFinder Logo"
            className="mx-auto mb-4"
          /> */}
          <h2 className="text-lg font-bold">Beginner Fit</h2>
          <p className="text-sm text-gray-600">
            BeginnerFitはトレーニング初心者のためのトレーニングサポートアプリです。
          </p>
          <p className="text-sm text-gray-600">
            あなたにあったプログラムで一緒にトレーニングを頑張りましょう！
          </p>
        </div>
        <button
          onClick={handleLogin("google")}
          type="button"
          className="w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center hover:bg-blue-400"
        >
          <Image
            src="/images/google-logo.svg"
            alt="Google logo"
            width={40}
            height={40}
          />
          Googleでログイン
        </button>
        <div className="text-center">
          <a href="#" className="text-xs text-gray-600">
            利用規約
          </a>
          、
          <a href="#" className="text-xs text-gray-600">
            プライバシーポリシー
          </a>
          に同意したうえでログインしてください。
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
