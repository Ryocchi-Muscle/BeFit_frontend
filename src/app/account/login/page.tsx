"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import usePreventScroll from "@/hooks/usePreventScroll";

const LoginPage = () => {
  usePreventScroll();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    // ログイン済みの場合はTOPページにリダイレクト
    if (status === "authenticated") {
      toast({
        title: "ログインしました！",
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
      <div className="w-full max-w-xs space-y-6 rounded-3xl bg-white p-8 shadow-xl fixed top-20">
        <div className="text-center">
          <Image
            src="/images/Pasted Graphic.png"
            alt="Be Fit Logo"
            width={60}
            height={60}
            className="mx-auto mb-0"
          />
          <Image
            src="/images/LOGO2.png"
            alt="Be Fit Logo"
            width={100}
            height={100}
            className="mx-auto mb-0 pt-2 pb-2"
          />
          <p className="text-sm text-gray-600">
            Be Fitはトレーニング初心者のためのトレーニングサポートアプリです。
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
          <Link href="/account/login/terms" className="text-xs text-gray-600 mr-2" id="link">
            ①利用規約
          </Link>
          <Link href="/account/login/privacy" className="text-xs text-gray-600" id="link">
            ②プライバシーポリシー
          </Link>
          に同意したうえでログインしてください。
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
