"use client";
import React, { useState } from "react";
import { secureApiCall } from "@/app/utils/api";
import TrainingDay from "./TrainingDay";
import AddTrainigMenu from "./AddTrainigMenu";
import { Set } from "../../../../types"; // Set 型をインポート

export default function TrainingRecord() {
  const [trainingDay, setTrainingDay] = useState<Date | null>(null);
  const [trainingMenus, setTrainingMenus] = useState<any[]>([]);
  const [trainingSets, setTrainingSets] = useState<any[]>([]); // ここで初期値を空の配列に設定

  const totalDays = 90; // トレーニングプログラムの総日数として固定値を使用
  const startDate = new Date();

  // トレーニングセットの状態を更新する関数
  const updateTrainingSets = (menuIndex: number, newSets: Set[]) => {
    const updatedTrainingSets = [...trainingSets];
    updatedTrainingSets[menuIndex] = newSets;
    console.log("Updating sets");
    setTrainingSets(updatedTrainingSets);
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
      <AddTrainigMenu
        trainingMenus={trainingMenus}
        setTrainingMenus={setTrainingMenus}
        trainingSets={trainingSets}
        updateTrainingSets={updateTrainingSets}
      />
      <button onClick={handleSaveTrainingRecord}>Save Training Record</button>
    </div>
  );
}
