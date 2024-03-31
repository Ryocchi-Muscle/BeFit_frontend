"use client";
import React, { useState } from "react";
import TrainingMenu from "./TrainingMenu";
import Footer from "../layout/Footer";



export default function AddTrainigMenu() {
  // TrainingMenu コンポーネントのリストを管理する状態
  const [trainingMenus, setTrainingMenus] = useState([{ key: 0, number: 1 }]);

  // TrainingMenu コンポーネントを追加する関数
const handleAddTrainingMenu = () => {
  const newKey = trainingMenus.length;
  const newNumber = trainingMenus[trainingMenus.length - 1].number + 1;
  setTrainingMenus([...trainingMenus, { key: newKey, number: newNumber }]);
};

  // TrainingMenu コンポーネントを削除する関数
  const handleRemoveTrainingMenu = (index: number) => {
    const updatedTrainingMenus = trainingMenus.filter((_, i) => i !== index);
    setTrainingMenus(updatedTrainingMenus);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {trainingMenus.map((menu) => (
        <TrainingMenu key={menu.key} number={menu.number} />
      ))}
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
            onClick={() => handleRemoveTrainingMenu(index)}
            disabled={trainingMenus.length === 1}
          >
            削除
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
