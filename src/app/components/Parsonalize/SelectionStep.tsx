import Image from "next/image";
import React from "react";

interface SelectionStepProps {
  title: string;
  options: Array<{ label: string; value: string; icon?: string }>;
  onSelect: (value: string) => void;
}

const SelectionStep: React.FC<SelectionStepProps> = ({
  title,
  options,
  onSelect,
}) => {
  return (
    <div style={styles.container}>
      <h2>{title}</h2>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          style={styles.optionButton}
        >
          {option.icon && (
            <Image
              src={option.icon}
              alt={option.label}
              style={styles.icon}
              width={100}
              height={100}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  optionButton: {
    padding: "10px",
    margin: "10px",
    fontSize: "16px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
  },
};

export default SelectionStep;
