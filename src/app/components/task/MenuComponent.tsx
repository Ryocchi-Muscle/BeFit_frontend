"use client"
import React, { useState } from "react";

const MenuComponent = ({ number }: { number: number }) => {
  const [bodyPart, setBodyPart] = useState("");
  const [exerciseName, setExerciseName] = useState("");

  return (
    <div className="menu-component">
      <div className="menu-header">
        <h3>{`種目No. ${number}`}</h3>
        <select value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>
          <option value="">部位を選択</option>
          <option value="胸">胸</option>
          <option value="背中">背中</option>
          <option value="脚">脚</option>
        </select>
        <input
          className="border border-gray-300 p-1 rounded w-1/4"
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="種目名を入力"
        />
      </div>
      {/* 他の要素、セット追加ボタンなど */}
    </div>
  );
};

export default MenuComponent;
