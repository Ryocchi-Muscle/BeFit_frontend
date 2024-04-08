"use client";
import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";

const TrainingDay = ({ currentDay, totalDays = 90 }: { currentDay: number; totalDays: number }) => {
  const progressPercentage = (currentDay / totalDays) * 100;
  const [selectedDate, setSelectedDate] = useState(new Date());

  let motivationalMessage = "";
  if (currentDay == 30) {
        motivationalMessage =
          "素晴らしい進捗です！次のステップに向けて頑張りましょう。";
  } else if (currentDay == 60) {
    motivationalMessage = "もう半分です！最後まで諦めずに頑張りましょう。";
  }

  const incrementDate = () => {
    setSelectedDate((currentDate) => addDays(currentDate, 1));
  };

  const decrementDate = () => {
    setSelectedDate((currentDate) => subDays(currentDate, 1));
  };

  useEffect(() => {
    console.log("日付が変更されました", selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <div>
        Day {currentDay} of {totalDays}
      </div>
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
