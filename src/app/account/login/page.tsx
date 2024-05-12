"use client";

import React from "react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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
      <form className="w-full max-w-xs space-y-6 rounded bg-white p-8 shadow-md">
        <button
          onClick={handleLogin("google")}
          type="button"
          className="w-full bg-red-500 text-white rounded-lg px-4 py-2"
        >
          Googleでログイン
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
