import React, { useState } from "react";
import MyComboBox from "./Combobox";

interface TrainingSet {
  setId: number;
  weight: number;
  reps: number;
  completed: boolean;
}

interface TrainingMenuProps {
  menuId: number;
  menuName: string;
  removeMenu: () => void;
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
          <div>
            <MyComboBox />
            <input
              className="p-1 border"
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="メニュー名"
            />
          </div>

          <button
            className="py-1 px-2 bg-red-500 text-white rounded"
            onClick={removeMenu}
          >
            メニュー削除
          </button>
        </div>
        {sets.map((set, index) => (
          <div key={index} className="set flex items-center mb-2">
            <div className="mr-2">{set.setId} set</div>
            <input
              className="mr-2 p-1 border"
              type="number"
              value={set.weight}
              onChange={(e) =>
                handleSetChange(set.setId, "weight", e.target.value)
              }
              placeholder="重量"
            />
            <input
              className="mr-2 p-1 border"
              type="number"
              value={set.reps}
              onChange={(e) =>
                handleSetChange(set.setId, "reps", e.target.value)
              }
              placeholder="回数"
            />
            <input
              type="checkbox"
              checked={set.completed}
              onChange={(e) =>
                handleSetChange(set.setId, "completed", e.target.checked)
              }
            />
            <button
              className="ml-2 p-1 bg-red-500 text-white rounded"
              onClick={() => handleRemoveSet(set.setId)}
            >
              削除
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 py-1 px-2 bg-blue-500 text-white rounded"
          onClick={handleAddSet}
        >
          セットを追加
        </button>
      </div>
    );
}
