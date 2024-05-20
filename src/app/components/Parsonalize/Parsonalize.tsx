"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SelectionStep from "./SelectionStep";
import LoadingScreen from "./LoadingScreen";
import ProgramCard from "./ProgramCard";
import { useSession } from "next-auth/react";

interface Program {
  title: string;
  image: string;
  details: string[];
}

const PersonalizePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    frequency: "",
  });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program[]>([]);

  const handleNextStep = () => setStep(step + 1);
  console.log("step", step);
  const handlePrevStep = () =>
    setStep((prevStep) => (prevStep === 4 ? 0 : prevStep - 1));

  const handleSelect = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    handleNextStep();
  };

  const handlePlanCreation = async () => {
    setLoading(true);
    // プラン作成処理を実行（例：API呼び出し）
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/personalized_menus`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          gender: formData.gender,
          frequency: formData.frequency,
        }),
      });

      if (!response.ok) {
        throw new Error("APIエラーが発生しました");
      }
      console.log("response", response);
      const data = await response.json();
      setProgram(data.program as Program[]);
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    } finally {
      setLoading(false);
      handleNextStep();
    }
  };

  const handleCombinedClick = async () => {
    setStep(4);
    await handlePlanCreation();
  };

  const handleRecordButtonClick = () => {
    const query = new URLSearchParams({
      program: JSON.stringify(program),
    }).toString();
    router.push(`/category/parsonalize/record_page?${query}`);
  };

  return (
    <div className="flex flex-col items-center p-0 min-h-screen overflow-y-auto">
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          {step === 0 && (
            <div className="flex flex-col items-center justify-start h-screen gap-5 pt-[15vh]">
              <button
                className="bg-blue-500 text-white py-5 px-10 rounded-lg text-lg border-2 border-blue-500 cursor-pointer w-4/5 max-w-lg transition-all"
                onClick={handleNextStep}
              >
                <h1 className="text-3xl font-bold">
                  バルクUP
                  <br />
                  プラン作成
                </h1>
                <h3 className="text-base mt-2">効率的な筋肥大プログラム</h3>
              </button>
              <button
                className="bg-purple-700 text-white py-5 px-10 rounded-lg text-lg border-2 border-purple-700 cursor-pointer w-4/5 max-w-lg transition-all"
                onClick={() => alert("記録")}
              >
                <div className="text-center">
                  <h1 className="text-3xl font-bold">
                    パーソナル
                    <br />
                    プラン作成
                  </h1>
                  <h3 className="text-base mt-2">
                    自分に合ったプランでトレーニングを開始する
                  </h3>
                </div>
              </button>
            </div>
          )}
          {step === 1 && (
            <SelectionStep
              title="性別を選択してください"
              options={[
                {
                  label: "男",
                  value: "male",
                  icon: "/Parsonalize/images.jpeg",
                },
                {
                  label: "女",
                  value: "female",
                  icon: "/Parsonalize/images.jpeg",
                },
              ]}
              onSelect={(value) => handleSelect("gender", value)}
            />
          )}
          {step === 2 && (
            <SelectionStep
              title="トレーニング頻度を選択してください"
              options={[
                { label: "週1", value: "1" },
                { label: "週2-3", value: "2-3" },
                { label: "週4~6", value: "4-6" },
              ]}
              onSelect={(value) => handleSelect("frequency", value)}
            />
          )}
          {step === 3 && (
            <div className="flex flex-col items-center justify-start min-h-[calc(100vh-70px)] pt-18">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center w-4/5 max-w-lg mt-0">
                <h2 className="text-blue-500 text-xl mb-5">プラン作成完了！</h2>
                <p>性別: {formData.gender}</p>
                <p>トレーニング頻度: {formData.frequency}</p>
                {step === 3 && (
                  <button
                    className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
                    onClick={handleCombinedClick}
                  >
                    作成されたプランを確認する
                  </button>
                )}
                <button
                  className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
                  onClick={handlePrevStep}
                >
                  戻る
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col items-center justify-start h-screen pt-18 overflow-y-auto pb-20">
              <h2 className="text-blue-500 text-xl mb-5">
                作成されたプログラム
              </h2>
              <div className="flex flex-wrap justify-center">
                {program.map((item, index) => (
                  <ProgramCard
                    key={index}
                    title={item.title}
                    image={item.image}
                    details={item.details}
                  />
                ))}
                <button
                  className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
                  onClick={handleRecordButtonClick}
                >
                  プログラムをスタートする
                </button>
                <button
                  className="fixed top-20 left-5 py-3 px-5 bg-blue-500 text-white border-none rounded-full cursor-pointer shadow-lg"
                  onClick={handlePrevStep}
                >
                  戻る
                </button>
              </div>
            </div>
          )}
          {step > 0 && step < 3 && (
            <button
              className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
              onClick={handlePrevStep}
            >
              戻る
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalizePage;
