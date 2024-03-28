import React from "react";
import Footer from "@/app/components/layout/Footer";
import DateCounter from "@/app/components/task/DateCounter";
import TrainingMenu from "@/app/components/task/TrainingMenu";
import AddTrainigMenu from "@/app/components/task/AddTrainigMenu";

export default function TaskPage() {
  return (
    <div>
      <DateCounter />
      <h1 className="text-4xl">日々のミッション</h1>
      <TrainingMenu />
      <AddTrainigMenu />
      <Footer />
    </div>
  );
}
