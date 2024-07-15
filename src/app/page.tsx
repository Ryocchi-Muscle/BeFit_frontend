"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AuthProvider } from "./components/context/authContext";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function TopPage() {
  const router = useRouter();
  const { toast } = useToast();

useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const success = searchParams.get("success");
  if (success === "accountDeleted") {
    toast({
      title: "退会が完了しました。",
      duration: 3000,
      style: { backgroundColor: "green", color: "white" },
    });
  }
}, [toast]);


  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <AuthProvider>
        <main className="flex-grow">
          <section className="relative bg-blue-900 text-white">
            <div className="relative w-full h-64  sm:h-96  md:h-[600px] lg:h-[800px] xl:h-[900px] overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/images/thumbnail.png"
                  alt="LOGO"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="object-center pt-2"
                />
              </div>
            </div>
          </section>

          <section className="bg-gray-900 py-10 text-white">
            <div className="max-w-5xl px-4 mx-auto my-8 space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  トレーニングサポートサービス
                </h2>
                <p className="text-gray-300 text-lg sm:text-xl">
                  Be Fit
                  は、筋トレ初心者でも簡単にトレーニングプランを作成・記録できるアプリです。
                </p>
                <p className="text-gray-300 text-base sm:text-lg">
                  あなたのフィットネス目標達成をサポートします。
                  <br />
                  Googleアカウントがあれば、ログインボタンを押すだけですぐに始められます！
                </p>
                <div className="flex justify-center mt-6">
                  <Link href="account/login" legacyBehavior>
                    <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600">
                      今すぐ始める
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-6 py-10 bg-[#f0f4f8]">
            <h2 className="text-3xl font-bold text-center text-[#001858]">
              機能紹介
            </h2>
            <h2 className="text-lg font-semibold text-center mb-5 text-[#001858]">
              Features
            </h2>
            <div className="container mx-auto flex justify-center py-10">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center w-full">
                <FeatureCard
                  src="/images/TopPage/program.png"
                  alt="BeFit"
                  title="Program"
                  subtitle="プログラム作成"
                  description="性別、1週間のトレーニング頻度、プログラムの実施期間を選択するだけで、自分に合ったプログラムを作成できます。"
                />
                <FeatureCard
                  src="/images/TopPage/record.png"
                  alt="BeFit"
                  title="Record"
                  subtitle="トレーニング記録"
                  description="1週間の総重量をグラフで確認することができ、日々のトレーニングの進捗を把握できます。"
                />
                <FeatureCard
                  src="/images/TopPage/calendar.png"
                  alt="BeFit"
                  title="Calendar"
                  subtitle="カレンダー機能"
                  description="カレンダーからその日のトレーニング記録を確認できます。
                    過去のトレーニング履歴も簡単に振り返ることができます。"
                />
                <FeatureCard
                  src="/images/TopPage/guide.png"
                  alt="BeFit"
                  title="Training Guide"
                  subtitle="トレーニング解説"
                  description="各トレーニングの解説を通じて、鍛えられる筋肉の画像や詳細な説明を提供します。
                    おすすめの動画も掲載していますので、効果的なトレーニングが行えます。"
                />
              </div>
            </div>
          </section>
        </main>
        <footer className="footer footer-center p-10 base-100 text-base-300 rounded mt-auto gap-y-1 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex flex-col sm:flex-row gap-x-4 gap-y-2">
                <Link href="/TopPage/privacy">
                  <span className="text-sm cursor-pointer">
                    プライバシーポリシー
                  </span>
                </Link>
                <Link href="/TopPage/terms">
                  <span className="text-sm cursor-pointer">利用規約</span>
                </Link>
              </div>
              <span className="text-sm mt-2 sm:mt-0">
                © 2024 Be Fit. All rights reserved.
              </span>
            </div>
          </div>
        </footer>
      </AuthProvider>
    </div>
  );
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  src,
  alt,
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center text-[#001858] max-w-xs mx-auto transition transform hover:-translate-y-2 hover:shadow-xl">
      <div className="relative w-full h-64">
        <Image src={src} alt={alt} layout="fill" objectFit="contain" />
      </div>
      <h3 className="text-2xl pt-4 font-semibold mb-2">{title}</h3>
      <h3 className="text-sm mb-2">{subtitle}</h3>
      <p className="text-sm text-[#172c66]">{description}</p>
    </div>
  );
};
