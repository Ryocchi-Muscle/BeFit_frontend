"use client";
import React, { useState } from "react";
import { secureApiCall } from "@/app/utils/api";
import TrainingDay from "./TrainingDay";
import TrainingSet from "./TrainingSet";
import AddTrainigMenu from "./AddTrainigMenu";

export default function TrainingRecord() {
  const [trainingDay, setTrainingDay] = useState<Date | null>(null);
  const [trainingMenus, setTrainingMenus] = useState<any[]>([]);
  const [trainingSets, setTrainingSets] = useState<any[]>([]); // ここで初期値を空の配列に設定

  const totalDays = 90; // トレーニングプログラムの総日数として固定値を使用
  const [startDate, setStartDate] = useState<Date>(new Date());

  // Setの更新関数の実装
  const updateTrainingRecord = (newSets: any[]) => {
    setTrainingSets(newSets);
  };
  const handleSaveTrainingRecord = async () => {
    const payload = {
      day: trainingDay,
      menu: trainingMenus,
      sets: trainingSets,
    };
    try {
      const response = await secureApiCall(
        "saveTrainingRecord",
        "POST",
        payload
      );
      console.log("Record saved successfully", response);
    } catch (error) {
      console.log("Error saving record", error);
    }
  };

  return (
    <div>
      <TrainingDay
        setTrainingDay={setTrainingDay}
        totalDays={totalDays} // ここでtotalDaysを渡す
        startDate={startDate} // ここでstartDateを渡す
      />
      <AddTrainigMenu setTrainingMenus={setTrainingMenus} />
      <TrainingSet
        key={1}
        number={1}
        sets={trainingSets}
        updateSets={updateTrainingRecord}
      />
      <button onClick={handleSaveTrainingRecord}>Save Training Record</button>
    </div>
  );
}
