"use client";
import React, { useState, useEffect } from "react";

const DateCounter = () => {
  const [day, setDay] = useState(1); // 最初はDay 1からスタート
  const [trainingData, setTrainingData] = useState(null); // トレーニングデータの状態

  // 日付を増やす関数
  const incrementDay = () => {
    setDay((prevDay) => (prevDay < 90 ? prevDay + 1 : prevDay));
  };

  // 日付を減らす関数
  const decrementDay = () => {
    setDay((prevDay) => (prevDay > 1 ? prevDay - 1 : prevDay));
  };

  // dayが変わるたびにトレーニングデータを取得
  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetch(
          
          `${process.env.NEXT_PUBLIC_API_URL}/api/training_days/${day}`
        );
        const data = await response.json();
        setTrainingData(data);
      } catch (error) {
        console.error("Fetching training data failed", error);
      }
    };
    fetchTrainingData();
  }, [day]);

  return (
    <div className="flex items-center">
      <button onClick={decrementDay} disabled={day === 1}>
        左へスライド
      </button>
      <div>Day {day}</div>
      <button onClick={incrementDay} disabled={day === 90}>
        右へスライド
      </button>
    </div>
  );
};

export default DateCounter;
