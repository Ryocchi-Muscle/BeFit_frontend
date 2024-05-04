import React, { useEffect, useState } from "react";
import MyComboBox from "./Combobox";
import TrainigSet from "./TrainigSet";
import { TrainingSet } from "../../../../../types/types";

interface TrainingMenuProps {
  menuId: number;
  menuName: string;
  sets: TrainingSet[];
  updateSetInMenu: (menuId: number, newSets: TrainingSet[]) => void;
  updateMenuName: (menuId: number, newName: string) => void;
  removeMenu: (menuId: number) => void;
}

export default function TrainingMenuComponet({
  menuId,
  menuName,
  sets,
  updateMenuName,
  updateSetInMenu,
  removeMenu,
}: TrainingMenuProps) {
  console.log("sets", sets);
  const handleAddSet = () => {
    const newSetId = sets.length > 0 ? sets[sets.length - 1].setId + 1 : 1;
    const newSets = [
      ...sets,
      { setId: newSetId, weight: 0, reps: 0, completed: false },
    ];
    updateSetInMenu(menuId, newSets);
  };

  const handleRemoveSet = (setId: number) => {
    const filteredSets = sets.filter((set) => set.setId !== setId);
    const renumberedSets = filteredSets.map((set, index) => ({
      ...set,
      setId: index + 1,
    }));
    updateSetInMenu(menuId, renumberedSets);
  };

  // ユーザーがセットの重量や回数を変更したときに呼び出される関数
  const handleSetChange = (
    setId: number,
    field: keyof TrainingSet,
    value: string | boolean
  ) => {
    const updatedSets = sets.map((set) =>
      set.setId === setId ? { ...set, [field]: value } : set
    );
    updateSetInMenu(menuId, updatedSets);
  };

  return (
    <div className="training-menu my-4 p-4 border rounded">
      <div className="menu-header flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* <MyComboBox /> */}
          {/* <span className="bg-yellow-300 text-blue-800 font-bold p-2 rounded-lg shadow-md">
            {menuId}
          </span> */}
          <span className="mr-3 text-lg font-bold text-white py-1 px-2 bg-gradient-to-r from-blue-500 to-teal-500 shadow-md">
            {menuId}
          </span>
          <input
            className="ml-2 p-1 border"
            type="text"
            value={menuName}
            onChange={(e) => updateMenuName(menuId, e.target.value)}
            placeholder="メニュー名"
          />
        </div>
      </div>
      {(sets || []).map((set, index) => (
        <TrainigSet
          key={index}
          setId={set.setId}
          weight={set.weight}
          reps={set.reps}
          completed={set.completed}
          updateSet={handleSetChange}
          removeSet={() => handleRemoveSet(set.setId)}
        />
      ))}
      <button
        type="button"
        className="mt-2 py-1 px-2 bg-blue-500 text-white rounded"
        onClick={handleAddSet}
      >
        + セットを追加
      </button>
      <button
        className="mt-2 py-1 px-2 bg-red-500 text-white rounded"
        type="button"
        onClick={() => removeMenu(menuId)}
      >
        メニューを削除
      </button>
    </div>
  );
}
