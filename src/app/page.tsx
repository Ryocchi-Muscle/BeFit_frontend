"use client";

import React from "react";
import { AuthProvider } from "./components/context/authContext";
import Image from "next/image";

export default function TopPage() {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <AuthProvider>
        <main className="flex-grow">
          {/* ヒーローセクション */}
          <section className="flex justify-center items-center my-5">
            <div className="flex items-center">
              <div className="w-24 md:w-40">
                <Image
                  src="/images/Pasted Graphic.png"
                  alt="LOGO"
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-48 md:w-80">
                <Image
                  src="/images/LOGO2.png"
                  alt="BeFit"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </section>
          <div className="text-center md:text-lg min-[320px]:text-xs my-2 font-semibold">
            <p className="text-[#172c66]">筋トレを日常に💪</p>
            <p className="text-[#172c66]">
              Speak Fluent, Speak Confident, BeFit.
            </p>
          </div>

          {/* サービスセクション */}
          <section className="container mx-auto px-6 py-10 ">
            <h2 className="text-3xl font-bold text-center text-[#001858]">
              機能紹介
            </h2>
            <h2 className="text-lg font-semibold text-center mb-5 text-[#001858]">
              Features
            </h2>
            <div className="container mx-auto flex justify-center py-10">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center w-full">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-[#001858] max-w-xs mx-auto">
                  <Image
                    src="/images/abs.png"
                    alt="BeFit"
                    width={400}
                    height={400}
                  />
                  <h3 className="text-2xl font-semibold mb-2">Program</h3>
                  <h3 className="text-sm mb-2">プログラム作成</h3>
                  <p className="text-sm text-[#172c66]">
                    性別、1週間のトレーニング頻度、プログラムの実施期間を選択するだけで、自分に合ったプログラムを作成できます。
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-[#001858] max-w-xs mx-auto">
                  <Image
                    src="/images/abs.png"
                    alt="BeFit"
                    width={400}
                    height={400}
                  />
                  <h3 className="text-2xl font-semibold mb-2">
                    Record
                  </h3>
                  <h3 className="text-sm mb-2">トレーニング記録</h3>
                  <p className="text-sm text-[#172c66]">
                    1週間の総重量をグラフで確認することができ、日々のトレーニングの進捗をかくにん
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-[#001858] max-w-xs mx-auto">
                  <Image
                    src="/images/abs.png"
                    alt="BeFit"
                    width={400}
                    height={400}
                  />
                  <h3 className="text-2xl font-semibold mb-2">Calendar</h3>
                  <h3 className="text-sm mb-2">カレンダー機能</h3>
                  <p className="text-sm text-[#172c66]">
                    カレンダーから、完了したプログラムの記録を確認できるよ！
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 text-center text-[#001858] max-w-xs mx-auto">
                  <Image
                    src="/images/abs.png"
                    alt="BeFit"
                    width={400}
                    height={400}
                  />
                  <h3 className="text-2xl font-semibold mb-2">TrainingGuide</h3>
                  <h3 className="text-sm mb-2">トレーニング解説</h3>
                  <p className="text-sm text-[#172c66]">
                    プログラムに含まれるトレーニングの解説を確認できるよ！
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center mb-10">
            <a
              href="/new_user_registration"
              className="flex items-center text-center py-3 px-4 font-semibold text-sm text-[#172c66] rounded-3xl bg-[#ffd803] hover:bg-[#bae8e8] cursor-not-allowed opacity-50"
            >
              <i className="fa-solid fa-user-plus fa-xl mr-2"></i> Study Now!
            </a>
          </div>
        </main>
        <footer className="footer footer-center p-10 base-100 text-base-300 rounded mt-auto gap-y-1 bg-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-end">
              <span className="text-sm">©2024 Be Fit</span>
            </div>
          </div>
        </footer>
      </AuthProvider>
    </div>
  );
}
