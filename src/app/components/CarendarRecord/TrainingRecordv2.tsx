import React, { useState } from "react";
import { BodyPartCombobox } from "./BodyPartCombobox";

interface TrainingMenu {
  bodyPart: string;
  menuName: string;
}

interface TrainingSet {
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
}

// 初期のセットの状態
const initialSets: TrainingSet[] = [
  { setNumber: 1, weight: 100, reps: 10, completed: true },
  { setNumber: 2, weight: 0, reps: 0, completed: false },
];

const TrainingForm: React.FC = () => {
  const [trainingMenu, setTrainingMenu] = useState<TrainingMenu>({
    bodyPart: "",
    menuName: "",
  });
  const [trainingSets, setTrainingSets] = useState<TrainingSet[]>(initialSets);

  const handleBodyPartSelect = (value: string) => {
    setTrainingMenu((prev) => ({ ...prev, bodyPart: value }));
  };


  // トレーニングメニューの入力を処理
  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingMenu({ ...trainingMenu, [e.target.name]: e.target.value });
  };

  // トレーニングセットの入力を処理
  const handleSetChange = (
    index: number,
    field: keyof TrainingSet,
    value: string | boolean
  ) => {
    setTrainingSets(
      trainingSets.map((set, i) =>
        i === index ? { ...set, [field]: value } : set
      )
    );
  };

  // フォームの送信を処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信するデータを確認するためにコンソールに出力
    console.log(trainingMenu, trainingSets);
    // API呼び出しやその他の処理をここで行う
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <BodyPartCombobox onSelect={handleBodyPartSelect} />
        <input
          type="text"
          name="menuName"
          placeholder="メニュー名"
          value={trainingMenu.menuName}
          onChange={handleMenuChange}
          className="border-2 border-gray-300 p-2 rounded-md flex-1"
        />
      </div>

      {trainingSets.map((set, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <span>{set.setNumber} set</span>
          <input
            type="number"
            name="weight"
            placeholder="kg"
            value={set.weight}
            onChange={(e) => handleSetChange(index, "weight", e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md flex-1"
          />
          <input
            type="number"
            name="reps"
            placeholder="回数"
            value={set.reps}
            onChange={(e) => handleSetChange(index, "reps", e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md flex-1"
          />
          <input
            type="checkbox"
            checked={set.completed}
            onChange={(e) =>
              handleSetChange(index, "completed", e.target.checked)
            }
            className="h-5 w-5"
          />
        </div>
      ))}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() =>
            setTrainingSets([
              ...trainingSets,
              {
                setNumber: trainingSets.length + 1,
                weight: 0,
                reps: 0,
                completed: false,
              },
            ])
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          セットを追加
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          保存
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
