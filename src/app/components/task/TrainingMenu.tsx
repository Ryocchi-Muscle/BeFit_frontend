'use client'
import React, { useState } from "react";


const TrainingMenu = () => {
  const [sets, setSets] = useState([
    { weight: 100, reps: 10, completed: false },
    { weight: "", reps: "", completed: false },
  ]);

  const handleWeightChange = (index: number, value: string) => {
    const newSets = [...sets];
    newSets[index].weight = value;
    setSets(newSets);
  };

  const handleRepsChange = (index: number, value: string) => {
    const newSets = [...sets];
    newSets[index].reps = value;
    setSets(newSets);
  };

  const handleCompletedChange = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    setSets(newSets);
  };

  const handleAddSet = () => {
    setSets([...sets, { weight: "", reps: "", completed: false }]);
  };

  const handleRemoveSet = (index: number) => {
    const newSets = [...sets];
    if (newSets.length > 1) {
      newSets.splice(index, 1);
      setSets(newSets);
    }
  };

  return (
    <div className="border border-blue-500 p-4 m-4 rounded">
      <div className="font-bold mb-2">ベンチプレス</div>
      {sets.map((set, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="mr-2">{index + 1} set</span>
          <input
            type="number"
            className="border border-gray-300 p-1 mr-2 rounded"
            value={set.weight}
            onChange={(e) => handleWeightChange(index, e.target.value)}
            placeholder="kg"
          />
          <input
            type="number"
            className="border border-gray-300 p-1 rounded"
            value={set.reps}
            onChange={(e) => handleRepsChange(index, e.target.value)}
            placeholder="回数"
          />
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 ml-2"
            checked={set.completed}
            onChange={() => handleCompletedChange(index)}
          />
          {sets.length > 1 && (
            <button
              className="bg-red-500 text-white p-1 ml-2 rounded"
              onClick={() => handleRemoveSet(index)}
            >
              −
            </button>
          )}
        </div>
      ))}
      <button
        className="bg-blue-500 text-white p-1 mt-2 rounded"
        onClick={handleAddSet}
      >
        +
      </button>
    </div>
  );
};

export default TrainingMenu;
