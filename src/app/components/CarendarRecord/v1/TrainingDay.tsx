"use client";
import React, { useState, useCallback } from "react";
import { format, differenceInCalendarDays } from "date-fns";

interface TrainingDayProps {
  setTrainingDay: (date: Date) => void; // このPropsは親コンポーネントからの状態更新関数を受け取る
}

const TrainingDay: React.FC<TrainingDayProps> = ({ setTrainingDay }) => {
  const [startDate, setStartDate] = useState<Date>(new Date()); // トレーニングの開始日を管理
  const currentDate = new Date();

  // トレーニング開始日からの経過日数を計算
  const dayCount = differenceInCalendarDays(currentDate, startDate) + 1;
  console.log("currentDate", currentDate);
  console.log("dayCount:", dayCount);

  // 開始日が変更された時に呼び出される関数
  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStartDate = new Date(e.target.value);
      setStartDate(newStartDate);
      setTrainingDay(newStartDate); // 親コンポーネントの状態も更新
    },
    [setTrainingDay]
  );

  // 現在の選択日を変更するための関数（日付ナビゲーションなどで使用可能）
  // const handleCurrentDateChange = useCallback((newDate: Date) => {
  //   setCurrentDate(newDate);
  // }, []);

  return (
    <div>
      <label htmlFor="start-date">トレーニング開始日:</label>
      <input
        type="date"
        id="start-date"
        value={format(startDate, "yyyy-MM-dd")}
        onChange={handleStartDateChange}
      />
      <p>トレーニング開始から {dayCount} 日目です。</p>
    </div>
  );
};

export default TrainingDay;
