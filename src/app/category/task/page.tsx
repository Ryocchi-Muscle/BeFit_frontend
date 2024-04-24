import React from "react";
import Footer from "@/app/components/layout/Footer";
import TrainingRecord from "@/app/components/task/TrainingRecord";
import StartDateForm from "@/app/components/task/StartDateForm";
import TrainingSessionDetails from "@/app/components/task/TrainingSessionDetails";

export default function TaskPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl">日々のミッション</h1>
        <StartDateForm userId={1} />
        <TrainingSessionDetails sessionId={1} />
        <TrainingRecord />
      </div>
      <Footer className="w-full" />
    </div>
  );
}
