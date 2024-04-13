"use client";
import React, { useState, useEffect } from "react";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";
import { TrainingDayProps } from "../../../../types";

const TrainingDay = ({
  totalDays = 90,
  startDate
}: TrainingDayProps
) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const currentDay = differenceInCalendarDays(selectedDate, startDate) + 1;
  const progressPercentage = (currentDay / totalDays) * 100;
  const [trainingData, setTrainingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


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

  // // ここでAPIからトレーニングデータを取得
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await.get();
  //       setTrainingData(response.data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedDate]);

  return (
    <div>
      <div>
        Day {currentDay} of {totalDays}
      </div>
      <button
        className="bg-blue-500 text-white p-2 mx-2 rounded"
        onClick={decrementDate}
        disabled={currentDay <= 1}
      >
        before
      </button>
      <button
        className="bg-blue-500 text-white p-2 mx-2 rounded"
        onClick={incrementDate}
        disabled={currentDay >= totalDays}
      >
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
