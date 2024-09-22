import React from "react";

const ImportantPoints: React.FC = () => {
  const points = [
    {
      title: "1. 正しいフォーム",
      content:
        "筋トレでは、正しいフォームで行うことが最も重要です。誤ったフォームでトレーニングを行うと、効果が半減するだけでなく、怪我のリスクも高まります。特にスクワットやデッドリフトのような複合種目では、腰や関節に負担がかかるため、正しい姿勢と動作を意識しましょう。",
    },
    {
      title: "2. 適切な負荷と漸進的なオーバーロード",
      content:
        "筋肉を成長させるためには、適切な負荷をかけ、徐々に負荷を増やす「漸進的なオーバーロード」が重要です。毎回同じ重さや回数でトレーニングを続けても成長が停滞してしまうため、定期的に重さや回数を増やしていきましょう。",
    },
    {
      title: "3. 栄養管理",
      content:
        "筋肉の成長には、十分な栄養が不可欠です。特にタンパク質は筋肉の修復と成長に必要なので、食事で十分な量のタンパク質を摂取することが大切です。また、炭水化物や脂質もエネルギー源として重要なので、バランスの取れた食事を心がけましょう。",
    },
    {
      title: "4. 十分な休息と回復",
      content:
        "筋肉はトレーニング中ではなく、休息中に成長します。トレーニング後にしっかりと休息をとり、筋肉を回復させることが重要です。特に同じ筋肉を連日鍛えると、オーバートレーニングになり、逆効果です。1つの筋肉群には最低でも48時間の休息を与えるようにしましょう。",
    },
    {
      title: "5. モチベーションの維持と一貫性",
      content:
        "筋トレは継続が鍵です。短期間での効果は期待できませんが、定期的にトレーニングを続けることで、徐々に結果が現れます。目標を設定し、小さな成果を積み重ねることでモチベーションを保ち、楽しみながら続けることが成功の秘訣です。",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          筋トレのポイント
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4">{point.title}</h2>
              <p className="text-gray-700">{point.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantPoints;
