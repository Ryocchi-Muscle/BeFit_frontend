'use client'
import React from "react";
import Footer from "@/app/components/layout/Footer";
import TodoComponent from "@/app/components/todo/TodoList";


export default function MissionPage() {
  return (
    <div>
      <h1>日々のミッション</h1>
      <DateCounter />
      <ExerciseForm />
      <SetControlButtons />
      <TodoComponent />
      <Footer />
    </div>
  );
}
