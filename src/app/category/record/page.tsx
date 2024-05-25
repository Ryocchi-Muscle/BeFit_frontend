"use client";
import Footer from "@/app/components/layout/Footer";
import React, { useState } from "react";
import TrainingChart from "@/components/TrainingChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Program {
  name: string;
  progress: string;
  description: string;
}

// ダミーデータ: 実際のアプリケーションではこのデータはAPIや状態管理から取得します
const dummyProgramData = null; // プログラムが作成されていない場合はnull、作成されている場合はオブジェクト

// プログラム未作成コンポーネント
const NoProgramComponent = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-xl font-semibold mb-4">
      プログラムが作成されていません
    </h2>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
      プログラムを作成する
    </button>
  </div>
);

// プログラム情報表示コンポーネント
const ProgramInfoComponent: React.FC<{ program: Program }> = ({ program }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-xl font-semibold mb-4">現在のプログラム</h2>
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-full">
      <p>プログラム名: {program.name}</p>
      <p>進行状況: {program.progress}</p>
      <p>概要: {program.description}</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
        プログラムをスタートする
      </button>
    </div>
  </div>
);

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

function RecordPage() {
  const [selectedDate, setSelectedDate] = useState(
    getWeekStartDate(new Date())
  );

  console.log("selectedDate", selectedDate);
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
            {dummyProgramData ? (
              <ProgramInfoComponent program={dummyProgramData} />
            ) : (
              <NoProgramComponent />
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
export default RecordPage;
