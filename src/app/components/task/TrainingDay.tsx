"use client";
import React, { useState, useCallback } from "react";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";
import { TrainingDayProps } from "../../../../types";

const TrainingDay: React.FC<TrainingDayProps> = ({
  setTrainingDay,
  totalDays = 90, // デフォルト値を設定
  startDate = new Date(), // デフォルトの開始日を今日の日付に
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const currentDay =
    differenceInCalendarDays(new Date(selectedDate), startDate) + 1;
  const progressPercentage = (currentDay / totalDays) * 100;

  let motivationalMessage = "";
  if (currentDay == 30) {
    motivationalMessage =
      "素晴らしい進捗です！次のステップに向けて頑張りましょう。";
  } else if (currentDay == 60) {
    motivationalMessage = "もう半分です！最後まで諦めずに頑張りましょう。";
  }

  // 日付変更時のコールバック
  const handleDateChange = useCallback(
    (newDate: Date) => {
      setSelectedDate(newDate);
      setTrainingDay(newDate);
    },
    [setTrainingDay]
  );

  return (
    <div>
      <div>
        Day {currentDay} of {totalDays}
      </div>
      {/* 日付選択部分（簡略化のためインプットタグを使用） */}
      <input
        type="date"
        value={format(selectedDate, "yyyy-MM-dd")}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      {/* 進捗バー */}
      <div
        style={{ width: "100%", backgroundColor: "#e0e0e0", margin: "10px 0" }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            backgroundColor: "#4caf50",
            height: "20px",
          }}
        ></div>
      </div>
      {motivationalMessage && <div>{motivationalMessage}</div>}
    </div>
  );
};

export default TrainingDay;
