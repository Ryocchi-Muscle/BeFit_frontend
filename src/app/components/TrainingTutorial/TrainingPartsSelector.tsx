import React from "react";
import { useRouter } from "next/router";

const TrainingPartsSelector = () => {
  const router = useRouter();
  const handleSelectChange = (e: any) => {
    const selectedPart = e.target.value;
    router.push(`/training/${selectedPart}`);
  };

  return (
    <select
      onChange={handleSelectChange}
      className="p-2 rounded border border-gray-300"
    >
      <option value="">部位を選択してください</option>
      <option value="chest">胸</option>
      <option value="back">背中</option>
      <option value="legs">脚</option>
      <option value="arms">腕</option>
      <option value="shoulders">肩</option>
      <option value="abs">腹</option>
    </select>
  );
};

export default TrainingPartsSelector;
