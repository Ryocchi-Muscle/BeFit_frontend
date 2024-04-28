import React, { useState } from "react";
import MyComboBox from "./Combobox";
import TrainingSet from "../v1/TrainingSet";
import TrainigSet from "./TrainigSet";

interface TrainingSet {
  setId: number;
  weight: number;
  reps: number;
  completed: boolean;
}

interface TrainingMenuProps {
  menuId: number;
  menuName: string;
  removeMenu: (menuId: number) => void;
}

export default function TrainingMenuComponet({ menuId, removeMenu }: TrainingMenuProps) {
  const [sets, setSets] = useState<TrainingSet[]>([]);
  const [menuName, setMenuName] = useState("");

  const handleAddSet = () => {
    const newSetId = sets.length > 0 ? sets[sets.length - 1].setId + 1 : 1;
    setSets((sets) => [
      ...sets,
      { setId: newSetId, weight: 0, reps: 0, completed: false },
    ]);
  };

  const handleRemoveSet = (setId: number) => {
    setSets((prevSets) => prevSets.filter((set) => set.setId !== setId));
  };

  // ユーザーがセットの重量や回数を変更したときに呼び出される関数
  const handleSetChange = (
    setId: number,
    field: keyof TrainingSet,
    value: string | boolean
  ) => {
    setSets(
      sets.map((set) =>
        set.setId === setId ? { ...set, [field]: value } : set
      )
    );
  };

    return (
      <div className="training-menu my-4 p-4 border rounded">
        <div className="menu-header flex justify-between items-center mb-4">
          <div className="flex items-center">
            <MyComboBox />
            <input
              className="ml-2 p-1 border"
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="メニュー名"
            />
          </div>
        </div>
        {sets.map((set) => (
          <TrainigSet
            key={set.setId}
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
          セットを追加
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
