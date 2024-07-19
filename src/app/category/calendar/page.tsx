"use client";
import React, { useState } from "react";
import Footer from "@/app/components/layout/Footer";
import { Calendar } from "@/components/ui/calender";
import usePreventScroll from "@/hooks/usePreventScroll";

export default function CalendarPage({ params }: { params: { day: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  usePreventScroll();

  return (
    <div className="flex flex-col h-screen pt-10 items-center">
      <div className="flex-1 overflow-y-auto flex flex-col items-center">
        <h1 className="text-2xl mb-4">カレンダー</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <Footer className="w-full" />
    </div>
  );
}
