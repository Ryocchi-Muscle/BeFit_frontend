"use client";
import React, { useState, useEffect } from "react";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";


const TrainingDay = ({ totalDays = 90, startDate }: { totalDays: number; startDate: Date }) => {
   const [selectedDate, setSelectedDate] = useState(new Date());
   const currentDay = differenceInCalendarDays(selectedDate, startDate) + 1;
   const progressPercentage = (currentDay / totalDays) * 100;



  let motivationalMessage = "";
  if (currentDay == 30) {
        motivationalMessage =
          "素晴らしい進捗です！次のステップに向けて頑張りましょう。";
  } else if (currentDay == 60) {
    motivationalMessage = "もう半分です！最後まで諦めずに頑張りましょう。";
  }

  //日を増やす関数
  const incrementDate = () => {
    setSelectedDate((currentDate) => addDays(currentDate, 1));
  };
//日を減らす関数
  const decrementDate = () => {
    setSelectedDate((currentDate) => subDays(currentDate, 1));
  };

  // useEffect(() => {
  //   console.log("日付が変更されました", selectedDate);
  // }, [selectedDate]);

  return (
    <div>
      <div>
        Day {currentDay} of {totalDays}
      </div>
      <button onClick={decrementDate} disabled={currentDay <= 1}>
        before
      </button>
      <button onClick={incrementDate} disabled={currentDay >= totalDays}>
        next
      </button>
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
