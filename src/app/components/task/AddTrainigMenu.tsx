"use client";
import React, { useState } from "react";
import TrainingSet from "./TrainingSet";
import Footer from "../layout/Footer";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { AddTrainigMenuProps, Set } from "../../../../types";


interface CustomSession extends Session {
  user_id: string;
  accessToken: string;
}

export default function AddTrainigMenu({}: AddTrainigMenuProps) {
  const { data: session } = useSession();
  // TrainingMenu コンポーネントのリストを管理する状態
  const [trainingMenus, setTrainingMenus] = useState([{ key: 0, number: 1 }]);
  const [trainingSets, setTrainingSets] = useState<Set[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // TrainingMenu コンポーネントを追加する関数
  const handleAddTrainingMenu = () => {
    const newKey = trainingMenus.length;
    const newNumber = trainingMenus[trainingMenus.length - 1].number + 1;
    setTrainingMenus([...trainingMenus, { key: newKey, number: newNumber }]);
    if (session) {
      fetch(`${apiUrl}/training_records`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${(session as CustomSession).accessToken}`,
          "Content-Type": "application/json",
        },
      });
    }
  };
  console.log("セッション", session);

  // TrainingMenu コンポーネントを削除する関数
  const handleRemoveLastTrainingMenu = () => {
    setTrainingMenus(trainingMenus.slice(0, -1));
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {trainingMenus.map((menu) => (
        <TrainingSet
          key={menu.key}
          number={menu.number}
          sets={trainingSets}
          updateSets={setTrainingSets}
        />
      ))}
      <div className="flex justify-center my-4">
        <button
          className="bg-blue-500 text-white p-2 mx-2 rounded"
          onClick={handleAddTrainingMenu}
        >
          追加
        </button>
        {/* TrainingMenuが2つ以上ある場合のみ削除ボタンを表示 */}
        {trainingMenus.length > 1 && (
          <button
            className="bg-red-500 text-white p-2 mx-2 rounded"
            onClick={handleRemoveLastTrainingMenu}
          >
            削除
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
