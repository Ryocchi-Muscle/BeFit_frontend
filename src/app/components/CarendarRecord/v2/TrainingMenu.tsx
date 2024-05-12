import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MyComboBox from "./Combobox";
import TrainigSet from "./TrainigSet";
import { TrainingSet } from "../../../../../types/types";
import { bodyParts } from "@/data/bodyParts";
import { validateTrainingMenuTitle } from "@/utils/validation";

interface TrainingMenuProps {
  menuId: number;
  menuName: string;
  bodyPart: string | null;
  sets: TrainingSet[];
  updateSetInMenu: (menuId: number, newSets: TrainingSet[]) => void;
  updateMenuName: (menuId: number, newName: string) => void;
  updateBodyPart: (menuId: number, bodyPart: string) => void;
  removeMenu: (menuId: number) => void;
}

export default function TrainingMenuComponet({
  menuId,
  menuName,
  bodyPart,
  sets,
  updateMenuName,
  updateBodyPart,
  updateSetInMenu,
  removeMenu,
}: TrainingMenuProps) {
  console.log("sets", sets);
  const [menuNameError, setMenuNameError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // フォーカスを自動的に設定
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    updateMenuName(menuId, newName);
    setMenuNameError(validateTrainingMenuTitle(newName));
  };

  const handleBlur = () => {
    const error = validateTrainingMenuTitle(menuName);
    setMenuNameError(error);
    if (!menuName) {
      setMenuNameError("メニュー名を入力してください");
    }
  };

  const handleBodyPartChange = (newBodyPart: string) => {
    updateBodyPart(menuId, newBodyPart);
  };
  const handleAddSet = () => {
    const newSetId = sets.length > 0 ? sets[sets.length - 1].setId + 1 : 1;
    const newSets = [
      ...sets,
      {
        setId: newSetId,
        setNumber: newSetId,
        weight: 0,
        reps: 0,
        completed: false,
      },
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
    <div className="training-menu my-4 p-4 border rounded shadow">
      <div className="menu-header flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3 flex-grow">
          <span className="mr-3 text-lg font-bold text-white py-1 px-2 bg-gradient-to-r from-blue-500 to-teal-500 shadow-md flex-none">
            {menuId}
          </span>
          <div className="flex flex-col w-full">
            <MyComboBox
              bodyParts={bodyParts}
              selectedBodyPart={bodyPart}
              onBodyPartSelect={handleBodyPartChange}
            />
            <input
              ref={inputRef}
              className="ml-2 p-1 border flex-grow"
              type="text"
              value={menuName}
              onChange={handleMenuNameChange}
              onBlur={handleBlur}
              placeholder="メニュー名"
            />
            {menuNameError && (
              <div className="text-red-500 mt-1">{menuNameError}</div>
            )}
          </div>
        </div>
      </div>
      {sets.map((set, index) => (
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
