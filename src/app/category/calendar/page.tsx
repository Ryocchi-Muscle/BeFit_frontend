"use client";
import React, { useState } from "react";
import Footer from "@/app/components/layout/Footer";
import { Calendar } from "@/components/ui/calender";
import { ComboboxDemo } from "@/components/ui/commbobox";

export default function TaskPage({ params }: { params: { day: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 pt-4 overflow-y-auto">
        <h1 className="text-2xl">カレンダー</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          // setFlashMessage={setFlashMessage}
          className="rounded-md border"
        />
        {flashMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">成功！</strong>
            <span className="block sm:inline">{flashMessage}</span>
            <button
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setFlashMessage(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>閉じる</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.846l-2.651 2.997a1.2 1.2 0 1 1-1.697-1.697l2.996-2.651-2.996-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.202l2.651-2.997a1.2 1.2 0 1 1 1.697 1.697l-2.996 2.651 2.996 2.651a1.2 1.2 0 0 1 0 1.697z"></path>
              </svg>
            </button>
          </div>
        )}
        {/* <StartDateForm userId={1} />
        <TrainingSessionDetails sessionId={1} /> */}
      </div>
      <Footer className="w-full" />
    </div>
  );
}
