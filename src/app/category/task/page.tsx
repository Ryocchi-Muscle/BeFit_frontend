// app/mission.page.tsx
import React from "react";
import Footer from "@/app/components/layout/Footer";
import TodoComponent from "@/app/components/todo/TodoList";
import DateCounter from "@/app/components/task/DateCounter";
import ExerciseForm from "@/app/components/task/ExerciseForm";
import SetControlButtons from "@/app/components/task/SetControlButtons";
import TrainingMenu from "@/app/components/task/TrainingMenu";

export default function MissionPage() {
  return (
    <div>
      <DateCounter />
      <h1>日々のミッション</h1>
      <TrainingMenu />
      <Footer />
    </div>
  );
}
