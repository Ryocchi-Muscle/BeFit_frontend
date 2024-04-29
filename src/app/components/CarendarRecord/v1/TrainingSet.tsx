import MenuComponent from "./MenuComponent";
import { TrainingSetProps } from "../../../../../types";
import { Set } from "../../../../../types";

const TrainingSet: React.FC<
  TrainingSetProps & { sets: Set[]; updateSets: (newSets: Set[]) => void }
> = ({ number, sets = [], updateSets }) => {
  console.log("updateSets type:", typeof updateSets);
  const handleWeightChange = (index: number, value: string) => {
    const newSets = sets.map((set, i) =>
      i == index ? { ...set, weight: value } : set
    );
    updateSets(newSets);
  };
  const handleRepsChange = (index: number, value: string) => {
    const newSets = sets.map((set, i) =>
      i == index ? { ...set, reps: value } : set
    );
    updateSets(newSets);
  };

  const handleCompletedChange = (index: number) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, completed: !set.completed } : set
    );
    updateSets(newSets);
  };

  const handleAddSet = () => {
    updateSets([...sets, { weight: "", reps: "", completed: false }]);
  };
  1;
  const handleRemoveSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    updateSets(newSets);
  };

  return (
    <div className="border border-blue-500 p-4 m-4 rounded">
      <MenuComponent number={number} />
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
          kg
          <input
            type="number"
            className="border border-gray-300 p-1 rounded w-1/4"
            value={set.reps}
            onChange={(e) => handleRepsChange(index, e.target.value)}
            placeholder="回数"
          />
          回
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 ml-2"
            checked={set.completed}
            onChange={() => handleCompletedChange(index)}
          />
        </div>
      ))}
      <div className="flex items-center mt-2 ml-4">
        <button
          type="button"
          className="bg-blue-500 text-white p-1 mt-2 rounded"
          onClick={handleAddSet}
        >
          追加
        </button>
        {sets.length > 1 && (
          <button
            className="bg-red-500 text-white p-1 ml-2 rounded"
            onClick={() => handleRemoveSet(sets.length - 1)}
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
};

export default TrainingSet;
