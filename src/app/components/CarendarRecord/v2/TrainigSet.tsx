import React from "react";

interface TrainigSetProps {
  setId: number;
  weight: number | string;
  reps: number | string;
  completed: boolean;
  updateSet: (
    setId: number,
    field: "weight" | "reps" | "completed",
    value: string | boolean
  ) => void;
  removeSet: () => void;
}

export default function TrainigSet({
  setId,
  weight,
  reps,
  completed,
  updateSet,
  removeSet,
}: TrainigSetProps) {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSet(setId, "weight", e.target.value);
  };
  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSet(setId, "reps", e.target.value);
  };
  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSet(setId, "completed", e.target.checked);
  };
  return (
    <div className="training-set bg-white shadow-sm rounded p-3 flex items-center justify-between mb-2">
      <span className="mr-3">{setId}</span>
      <input
        className="border p-1 mr-2 w-16"
        type="number"
        value={weight}
        placeholder="重量"
        onChange={handleWeightChange}
      />
      <input
        className="border p-1 mr-2 w-16"
        type="number"
        value={reps}
        placeholder="回数"
        onChange={handleRepsChange}
      />
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCompletedChange}
      />
      <button
        className="ml-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        onClick={removeSet}
        type="button"
      >
        削除
      </button>
    </div>
  );
}
