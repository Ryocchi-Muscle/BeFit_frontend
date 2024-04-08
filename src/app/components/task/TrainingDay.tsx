"use client";
import React, { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";

const TrainingDay = ({ currentDay, totalDays = 90 }: { currentDay: number; totalDays: number }) => {
  const progressPercentage = (currentDay / totalDays) * 100;
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <button onClick={decrementDate}>前の日</button>
      <span>{format(selectedDate, "yyyy/MM/dd")}</span>
      <button onClick={incrementDate}>次の日</button>
    </div>
  );
};

export default TrainingDay;
