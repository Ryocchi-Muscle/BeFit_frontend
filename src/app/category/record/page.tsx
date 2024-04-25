"use client";
// import TodoComponent from "@/app/components/todo/TodoList";
import Footer from "@/app/components/layout/Footer";
import { Calendar } from "@/components/ui/calender";
import React from "react";

function RecordPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <h1 className="text-4xl ">記録</h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <Footer />
    </div>
  );
}
export default RecordPage;
