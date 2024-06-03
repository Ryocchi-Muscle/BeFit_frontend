"use client";
import Footer from "@/app/components/layout/Footer";
import React, { useEffect, useState } from "react";
import TrainingChart from "@/components/TrainingChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import ProgramInfoComponent from "@/app/components/Program/ProgramInfo";
import NoProgramComponent from "@/app/components/Program/NoProgramComponent";
import { Program } from "types/types";

// 初期値を現在日を含む週の開始日に設定するヘルパー関数
function getWeekStartDate(date: Date) {
  const currentDate = new Date(date);
  console.log("currentDate", currentDate);
  const weekDay = currentDate.getDay();
  console.log("weekDay", weekDay);
  const startDate = new Date(
    currentDate.setDate(currentDate.getDate() - weekDay)
  );
  console.log("startDate", startDate);
  return startDate.toISOString().split("T")[0]; // YYYY-MM-DD形式で返す
}

const RecordPage: React.FC = () => {
  const { data: session } = useSession();
  const [programData, setProgramData] = useState<Program | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("プログラムデータ", programData);

  useEffect(() => {
    const fetchProgramData = async () => {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint = `${apiUrl}/api/v2/programs`;
      console.log("API endpoint:", endpoint);
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await response.json();
        console.log("Fetched program data:", data);
        if (response.ok && data && data.program && data.program.length > 0) {
          console.log("Setting program data:", data.program[0]);
          setProgramData(data.program[0]);
        } else {
          console.error("プログラムデータが見つかりません");
          setProgramData(null); // ここでNoProgramComponentが発火する
        }
      } catch (error) {
        console.error("エラーが発生しました: ", error);
        setProgramData(null); // ここでNoProgramComponentが発火する
      } finally {
        setLoading(false);
      }
    };

    if (session && loading) {
      fetchProgramData();
    } else {
      console.log("セッションがありません");
    }
  }, [session, loading]);

  const handleDelete = () => {
    setProgramData(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Tabs defaultValue="training" className="w-full">
          <div className="flex justify-center">
            <TabsList className="justify-center inline-flex p-1 bg-gray-200 rounded-md">
              <TabsTrigger
                value="training"
                className="py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                トレーニング記録
              </TabsTrigger>
              <TabsTrigger
                value="program"
                className="py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                プログラム管理
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="training" className="p-4">
            <h1 className="text-3xl font-bold text-blue-950">記録</h1>
            <TrainingChart />
          </TabsContent>
          <TabsContent value="program" className="p-4">
            <h1 className="text-3xl font-bold text-blue-950 ">
              プログラム管理
            </h1>
            {programData ? (
              <ProgramInfoComponent
                program={programData}
                onDelete={handleDelete}
              />
            ) : (
              <NoProgramComponent />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default RecordPage;
