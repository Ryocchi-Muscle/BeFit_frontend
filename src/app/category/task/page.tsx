import React from "react";
import Footer from "@/app/components/layout/Footer";
import TodoComponent from "@/app/components/todo/TodoList";
import DateCounter from "@/app/components/task/DateCounter";
import ExerciseForm from "@/app/components/task/MenuComponent";
import SetControlButtons from "@/app/components/task/SetControlButtons";
import TrainingMenu from "@/app/components/task/TrainingMenu";
import MenuComponent from "@/app/components/task/MenuComponent";

export default function MissionPage() {
  return (
    <div>
      <DateCounter />
      <TodoComponent></TodoComponent>
      <MenuComponent  number={10}/>
      <SetControlButtons></SetControlButtons>
      <h1>日々のミッション</h1>
      <TrainingMenu />
      <Footer />
    </div>
  );
}
