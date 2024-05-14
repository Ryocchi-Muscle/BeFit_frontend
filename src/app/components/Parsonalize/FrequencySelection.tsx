import React from "react";

interface FrequencySelectionProps {
  onSelect: (value: string) => void;
}

const FrequencySelection: React.FC<FrequencySelectionProps> = ({
  onSelect,
}) => {
  const frequencies = ["1回", "2回", "3回", "4回", "5回", "6回", "7回"];

  return (
    <div style={styles.container}>
      <h2>1週間あたりのトレーニング頻度を選択してください</h2>
      <select
        onChange={(e) => onSelect(e.target.value)}
        style={styles.selectBox}
      >
        <option value="">選択してください</option>
        {frequencies.map((freq) => (
          <option key={freq} value={freq}>
            {freq}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  selectBox: {
    padding: "10px",
    fontSize: "16px",
  },
};

export default FrequencySelection;
