"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import usePreventScroll from "@/hooks/usePreventScroll";

interface Program {
  title: string;
  image: string;
  week: number;
  details: { menu: string; set_info: string; other: string; day: number }[];
  day: number;
}

const PersonalizePage: React.FC = () => {
  usePreventScroll();
  const { data: session } = useSession();
  const [hasProgram, setHasProgram] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    frequency: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program[]>([]);
  const [dailyProgramId, setDailyProgramId] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>(""); // add エラーメッセージ用の状態
  const router = useRouter();

  const handleSelect = (key: string, value: string | number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
    console.log("value", value);
    console.log("formData", { ...formData, [key]: value });
  };

  //APIを呼び出してプランを作成する
  const handlePlanCreation = async () => {
    if (!formData.gender || !formData.frequency || !formData.duration) {
      setErrorMessage("全ての項目を選択してください。"); // エラーメッセージを設定
      return;
    }
    if (hasProgram) {
      alert("既にプランが存在します。既存のプランを削除してください。");
      return;
    }
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/personalized_menus/create_and_save`;
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
          duration: formData.duration,
        }),
      });
      console.log("response", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("APIエラーの詳細: ", errorData);
        throw new Error("APIエラーが発生しました");
      }
      const data = await response.json(); // データが存在する場合はJSONを取得
      console.log("data", data);
      console.log("data.program", data.program);
      if (data && data.program && data.program.daily_programs) {
        setProgram(data.program.daily_programs);
        setHasProgram(true);
        if (data.program.daily_programs[0]?.id) {
          setDailyProgramId(data.program.daily_programs[0].id);
        } else {
          console.error("daily_programs の ID が見つかりません");
        }
        console.log("data.program.daily_programs", data.program.daily_programs);
      } else {
        setProgram([]); // データが存在しない場合は空の配列を設定
        console.error("APIレスポンスに`daily_programs`が含まれていません");
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    } finally {
      setLoading(false);
      router.push("/category/program");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen overflow-y-auto bg-gray-50">
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <div className="pt-2 flex flex-col items-center justify-start min-h-[calc(100vh-70px)]  max-w-xs mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mt-0 space-y-6">
              <div>
                <h2 className="text-blue-500 text-xl mb-4 font-semibold">
                  トレーニングプラン設定
                </h2>
                <p className="text-gray-600 mb-6">
                  以下の情報を入力してプランを作成しましょう。
                </p>
                <div className="mb-4">
                  <h3 className="text-blue-500 text-l mb-2">性別</h3>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelect("gender", value)}
                  >
                    <SelectTrigger className="w-full max-w-xs mx-auto">
                      <SelectValue placeholder="性別" />
                    </SelectTrigger>
                    <SelectContent className="absolute left-0 right-0 top-full z-10">
                      <SelectGroup>
                        <SelectItem value="male">男</SelectItem>
                        <SelectItem value="female">女</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h3 className="text-blue-500 text-l mb-2">
                    トレーニング頻度（週）
                  </h3>
                  <Select
                    value={formData.frequency}
                    onValueChange={(value) => handleSelect("frequency", value)}
                  >
                    <SelectTrigger className="w-full max-w-xs mx-auto">
                      <SelectValue placeholder="トレーニング頻度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">週1</SelectItem>
                        <SelectItem value="2">週2</SelectItem>
                        <SelectItem value="3">週3</SelectItem>
                        <SelectItem value="4">週4</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h3 className="text-blue-500 text-l mb-2">プログラム期間</h3>
                  <Select
                    value={formData.duration.toString()}
                    onValueChange={(value) =>
                      handleSelect("duration", parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-full max-w-xs mx-auto">
                      <SelectValue placeholder="プログラム期間">
                        {formData.duration
                          ? `${formData.duration} 週間`
                          : "プログラム期間"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Array.from({ length: 9 }, (_, i) => i + 4).map(
                          (week) => (
                            <SelectItem key={week} value={week.toString()}>
                              {week} 週間
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                   {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
              </div>
              <div>
                {!hasProgram && (
                  <button
                    className="mt-5 py-3 px-5 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer transition duration-300 hover:bg-blue-700"
                    onClick={handlePlanCreation}
                  >
                    プラン作成
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalizePage;
