// components/TimeSelection.tsx
import React from "react";

interface TimeSelectionProps {
  onSelect: (value: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({ onSelect }) => {
  const times = ["30分", "45分", "60分"];

  return (
    <div style={styles.container}>
      <h2>1回のトレーニング時間を選択してください</h2>
      <select
        onChange={(e) => onSelect(e.target.value)}
        style={styles.selectBox}
      >
        <option value="">選択してください</option>
        {times.map((time) => (
          <option key={time} value={time}>
            {time}
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

export default TimeSelection;
