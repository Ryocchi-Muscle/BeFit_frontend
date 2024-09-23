"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ImportantPoints: React.FC = () => {
  const router = useRouter();
  const points = [
    {
      title: "1. 正しいフォーム",
      content: (
        <>
          <p>
            筋トレでは、
            <span className="font-semibold">正しいフォームで行う</span>
            ことが最も重要です。誤ったフォームでトレーニングを行うと、効果が半減するだけでなく、怪我のリスクも高まります。
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>スクワット</li>
            <li>デッドリフト</li>
          </ul>
          <p>
            特にこれらの複合種目では、腰や関節に負担がかかるため、
            <span className="font-semibold">正しい姿勢と動作</span>
            を意識しましょう。
          </p>
        </>
      ),
    },
    {
      title: "2. 適切な負荷と漸進的なオーバーロード",
      content: (
        <>
          <p>
            筋肉を成長させるためには、
            <span className="font-semibold">適切な負荷</span>
            をかけ、徐々に負荷を増やす「漸進的なオーバーロード」が重要です。
          </p>
          <p>
            毎回同じ重さや回数でトレーニングを続けても成長が停滞してしまうため、定期的に重さや回数を増やしていきましょう。
          </p>
        </>
      ),
    },
    {
      title: "3. 栄養管理",
      content: (
        <>
          <p>
            筋肉の成長には、<span className="font-semibold">十分な栄養</span>
            が不可欠です。特にタンパク質は筋肉の修復と成長に必要です。
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>タンパク質：筋肉の修復と成長に必要</li>
            <li>炭水化物と脂質：エネルギー源として重要</li>
          </ul>
          <p>バランスの取れた食事を心がけ、筋トレの効果を最大化しましょう。</p>
        </>
      ),
    },
    {
      title: "4. 十分な休息と回復",
      content: (
        <>
          <p>
            筋肉はトレーニング中ではなく、
            <span className="font-semibold">休息中に成長</span>
            します。トレーニング後にしっかりと休息をとり、筋肉を回復させることが重要です。
          </p>
          <p>
            同じ筋肉を連日鍛えると、オーバートレーニングになり、逆効果です。1つの筋肉群には最低でも48時間の休息を与えるようにしましょう。
          </p>
        </>
      ),
    },
    {
      title: "5. モチベーションの維持と一貫性",
      content: (
        <>
          <p>
            筋トレは<span className="font-semibold">継続が鍵</span>
            です。短期間での効果は期待できませんが、定期的にトレーニングを続けることで、徐々に結果が現れます。
          </p>
          <p>
            目標を設定し、小さな成果を積み重ねることでモチベーションを保ち、楽しみながら続けることが成功の秘訣です。
          </p>
        </>
      ),
    },
  ];

  const handleBackClick = () => {
    router.push("/category/training");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto p-6 pb-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          筋トレのポイント
        </h1>
        <div className="mt-8 mb-4">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
          >
            解説ページに戻る
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4">{point.title}</h2>
              <div className="text-gray-700 leading-relaxed">
                {point.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantPoints;
