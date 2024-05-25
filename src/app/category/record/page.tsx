"use client";
import Footer from "@/app/components/layout/Footer";
import React, { useState } from "react";
import TrainingChart from "@/components/TrainingChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <TabsList className="flex p-1 bg-gray-200 rounded-md">
            <TabsTrigger
              value="training"
              className="flex-1 py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              トレーニング記録
            </TabsTrigger>
            <TabsTrigger
              value="program"
              className="flex-1 py-2 px-4 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              プログラム
            </TabsTrigger>
          </TabsList>
          <TabsContent value="training" className="p-4">
            <h1 className="text-3xl font-bold text-blue-950">記録</h1>
            <TrainingChart />
          </TabsContent>
          <TabsContent value="program" className="p-4">
            <h1 className="text-3xl font-bold text-blue-950 ">
              プログラム管理
            </h1>
            {/* プログラム管理のコンテンツをここに追加 */}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
export default RecordPage;
