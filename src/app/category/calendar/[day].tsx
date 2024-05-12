// pages/app/category/mission/[day].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/app/components/layout/Footer";

export default function TrainingDayPage() {
  const router = useRouter();
  const { day } = router.query; // URLから日付を取得
  const [exercises, setExercises] = useState([]); // 種目の状態

  useEffect(() => {
    // 日付が変更されたときの処理
  }, [day]);

  const addExercise = () => {
    // 新しい種目を追加するロジック
  };

  return (
    <div>
      <h1>fitapp</h1>
      <h2>Day {day}</h2>
      <Footer />
    </div>
  );
}
