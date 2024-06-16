"use client";

import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import { useSession } from "next-auth/react";
import ProgramTrainingMenuDialog from "./ProgramTrainingMenuDialog";
import StartProgramDialog from "./StartProgramDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ProgramDetail } from "types/types";

interface Program {
  title: string;
  image: string;
  week: number;
  details: { menu: string; set_info: string; other: string; day: number }[];
  day: number;
}

const PersonalizePage: React.FC = () => {
  const { data: session } = useSession();
  const [hasProgram, setHasProgram] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    frequency: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<Program[]>([]);
  const [extendedProgram, setExtendedProgram] = useState<Program[]>([]);
  const [isStartProgramDialogOpen, setIsStartProgramDialogOpen] =
    useState(false);
  const [isTrainingMenuDialogOpen, setIsTrainingMenuDialogOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProgramDetails, setSelectedProgramDetails] = useState<
    ProgramDetail[]
  >([]);
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
        setProgram(data.program.daily_programs); // 保存されたプログラムを設定
        setHasProgram(true);
        console.log("data.program.daily_programs", data.program.daily_programs);
      } else {
        setProgram([]); // データが存在しない場合は空の配列を設定
        console.error("APIレスポンスに`daily_programs`が含まれていません");
      }
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    } finally {
      setLoading(false);
      router.push("/category/dashboard?tab=program");
    }
  };

  const handleConfirmStartProgram = () => {
    setIsStartProgramDialogOpen(false);
    setIsTrainingMenuDialogOpen(true);
  };

  const handleCloseStartProgramDialog = () => {
    setIsStartProgramDialogOpen(false);
  };

  const handleCloseTrainingMenuDialog = () => {
    setIsTrainingMenuDialogOpen(false);
  };

  useEffect(() => {
    const checkProgramExists = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/api/v2/programs`;
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHasProgram(data.programs && data.programs.length > 0);
          console.log("あるよん", data.programs);
        } else {
          console.error("プログラムの存在確認に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました: ", error);
      }
    };

    checkProgramExists();
  }, [session]);

  useEffect(() => {
    if (program.length > 0) {
      const frequency = parseInt(formData.frequency, 10); // トレーニング頻度を数値として取得
      const duration = parseInt(formData.duration, 10); // プログラム期間を数値として取得
      const totalProgramsNeeded = frequency * duration; // 必要なプログラムの総数

      // 必要なプログラムデータの数を満たすためにプログラムデータを補完
      const extendedProgramArray = new Array(totalProgramsNeeded);
      for (let i = 0; i < duration; i++) {
        for (let j = 0; j < frequency; j++) {
          const programIndex = i * frequency + j;
          const programData = program[programIndex % program.length];
          extendedProgramArray[programIndex] = {
            ...programData,
            week: i + 1,
            day: j + 1,
          };
        }
      }

      console.log("extendedProgramArray", extendedProgramArray);
      setExtendedProgram(extendedProgramArray); // ここで状態に設定
    }
  }, [program, formData.frequency, formData.duration]);

  return (
    <div className="flex flex-col items-center p-0 min-h-screen overflow-y-auto">
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          <div className="flex flex-col items-center justify-start min-h-[calc(100vh-70px)] pt-18">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center w-4/5 max-w-lg mt-0 space-y-6">
              <div>
                <h2 className="text-blue-500 text-xl mb-2">性別</h2>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelect("gender", value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="性別" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">男</SelectItem>
                      <SelectItem value="female">女</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h2 className="text-blue-500 text-xl mb-2">
                  トレーニング頻度（週）
                </h2>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => handleSelect("frequency", value)}
                >
                  <SelectTrigger className="w-[180px]">
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
              <div>
                <h2 className="text-blue-500 text-xl mb-2">プログラム期間</h2>
                <Select
                  value={formData.duration.toString()}
                  onValueChange={(value) =>
                    handleSelect("duration", parseInt(value))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="プログラム期間">
                      {formData.duration
                        ? `${formData.duration} 週間`
                        : "プログラム期間"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent style={{ top: "auto", bottom: "100%" }}>
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
            </div>
            <div>
              {!hasProgram && (
                <button
                  className="mt-5 py-3 px-5 bg-blue-500 text-white border-none rounded-lg cursor-pointer"
                  onClick={handlePlanCreation}
                >
                  プラン作成
                </button>
              )}
              {hasProgram && (
                <p>既にプランが存在します。既存のプランを削除してください。</p>
              )}
            </div>
          </div>
          <StartProgramDialog
            open={isStartProgramDialogOpen}
            onClose={handleCloseStartProgramDialog}
            onConfirm={handleConfirmStartProgram}
          />
          <ProgramTrainingMenuDialog
            open={isTrainingMenuDialogOpen}
            onClose={handleCloseTrainingMenuDialog}
            date={selectedDate}
            gender={formData.gender}
            frequency={formData.frequency}
            program={selectedProgramDetails}
          />
        </>
      )}
    </div>
  );
};

export default PersonalizePage;
