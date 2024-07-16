import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface TrainigSetProps {
  setId: number;
  weight: number | string;
  reps: number | string;
  completed: boolean;
  updateSet: (
    setId: number,
    field: "weight" | "reps" | "completed",
    value: string | boolean | number
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
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      updateSet(setId, "weight", value === "" ? "" : parseFloat(value));
    }
  };
  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      updateSet(setId, "reps", value === "" ? "" : parseInt(value, 10));
    }
  };
  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSet(setId, "completed", e.target.checked);
  };
  return (
    <div className="training-set bg-white shadow-sm rounded p-3 flex items-center justify-between mb-2">
      <span className="mr-3 text-lg font-bold font-custom tracking-wider text-shadow-default">
        {setId}
      </span>

      <input
        className="border p-1 mr-2 w-16"
        type="number"
        value={weight}
        placeholder="重量"
        onChange={handleWeightChange}
        inputMode="decimal"
      />
      <input
        className="border p-1 mr-2 w-16"
        type="number"
        value={reps}
        placeholder="回数"
        onChange={handleRepsChange}
        pattern="[0-9]*"
        inputMode="numeric"
      />
    </div>
  );
}
