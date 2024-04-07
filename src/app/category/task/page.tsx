import React from "react";
import Footer from "@/app/components/layout/Footer";
import DateCounter from "@/app/components/task/DateCounter";
import AddTrainigMenu from "@/app/components/task/AddTrainigMenu";

export default function TaskPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-4xl">日々のミッション</h1>
        {/* <DateCounter /> */}
        <AddTrainigMenu />
      </div>
      <Footer className="w-full" />
    </div>
  );
}
