"use client";
import React from "react";
import Footer from "@/app/components/layout/Footer";
import TrainingRecord from "@/app/components/CarendarRecord/v1/TrainingRecord";
import StartDateForm from "@/app/components/CarendarRecord/v1/StartDateForm";
import TrainingSessionDetails from "@/app/components/CarendarRecord/v1/TrainingSessionDetails";
import { Calendar } from "@/components/ui/calender";
import { ComboboxDemo } from "@/components/ui/commbobox";

export default function TaskPage({ params }: { params: { day: string } }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl">日々のミッション</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {/* <StartDateForm userId={1} />
        <TrainingSessionDetails sessionId={1} /> */}
      </div>
      <Footer className="w-full" />
    </div>
  );
}
