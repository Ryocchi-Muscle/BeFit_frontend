import React from "react";

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.button}>
      パーソナライズプランを作成する
    </button>
  );
};

const styles = {
  button: {
    padding: "20px",
    fontSize: "18px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default StartButton;
