"use client";
import React, { useState } from "react";
import TrainingMenu from "./TrainingMenu";
import Footer from "../layout/Footer";

export default function AddTrainigMenu() {
  // TrainingMenu コンポーネントのリストを管理する状態
  const [trainingMenus, setTrainingMenus] = useState([
    <TrainingMenu key={0} />,
  ]);

  // TrainingMenu コンポーネントを追加する関数
  const handleAddTrainingMenu = () => {
    setTrainingMenus([
      ...trainingMenus,
      <TrainingMenu key={trainingMenus.length} />,
    ]);
  };

  // TrainingMenu コンポーネントを削除する関数
  const handleRemoveTrainingMenu = () => {
    if (trainingMenus.length > 1) {
      setTrainingMenus(trainingMenus.slice(0, -1));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {trainingMenus.map((menu) => menu)}
      <div className="flex justify-center my-4">
        <button
          className="bg-blue-500 text-white p-2 mx-2 rounded"
          onClick={handleAddTrainingMenu}
        >
          追加
        </button>
        {trainingMenus.length > 1 && (
          <button
            className="bg-red-500 text-white p-2 mx-2 rounded"
            onClick={handleRemoveTrainingMenu}
            disabled={trainingMenus.length === 1} // 最後の1つは削除不可
          >
            削除
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
