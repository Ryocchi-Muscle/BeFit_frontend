import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2>プランを作成しています...</h2>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  spinner: {
    marginTop: "20px",
    width: "40px",
    height: "40px",
    border: "5px solid #ccc",
    borderTop: "5px solid #4CAF50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default LoadingScreen;
