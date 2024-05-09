"use client";
import Footer from "@/app/components/layout/Footer";
import WeeklySummaryChart from "@/components/ui/TrainingChart";
import React, { useState } from "react";

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
        <h1 className="text-4xl">記録</h1>
        <WeeklySummaryChart startDate={selectedDate} />
      </div>
      <Footer />
    </div>
  );
}
export default RecordPage;
