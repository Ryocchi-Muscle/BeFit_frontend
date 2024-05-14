"use client";

import React, { useState } from "react";
import StartButton from "./StartButton";
import SelectionStep from "./SelectionStep";
import TimeSelection from "./TimeSelection";
import FrequencySelection from "./FrequencySelection";
import LoadingScreen from "./LoadingScreen";

const PersonalizePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    experience: "",
    duration: "",
    frequency: "",
  });
  const [loading, setLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => {
    if (step == 5) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  const handleSelect = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    handleNextStep();
  };

  const handlePlanCreation = async () => {
    setLoading(true);
    // プラン作成処理を実行（例：API呼び出し）
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 模擬的な遅延
    setLoading(false);
    handleNextStep();
  };

  return (
    <div style={styles.container}>
      {loading && <LoadingScreen />}
      {!loading && (
        <>
          {step === 0 && (
            <div style={styles.buttonContainer}>
              <button
                style={
                  hoveredButton === "main"
                    ? { ...styles.mainButton, ...styles.mainButtonHover }
                    : styles.mainButton
                }
                onClick={handleNextStep}
                onMouseEnter={() => setHoveredButton("main")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                パーソナライズプランを作成する
              </button>
              <button
                style={
                  hoveredButton === "sub"
                    ? { ...styles.subButton, ...styles.subButtonHover }
                    : styles.subButton
                }
                onClick={() => alert("過去のパーソナライズプランを確認する")}
                onMouseEnter={() => setHoveredButton("sub")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                過去のパーソナライズプランを確認する
              </button>
            </div>
          )}
          {step === 1 && (
            <SelectionStep
              title="性別を選択してください"
              options={[
                { label: "男", value: "male", icon: "/male-icon.png" },
                { label: "女", value: "female", icon: "/female-icon.png" },
              ]}
              onSelect={(value) => handleSelect("gender", value)}
            />
          )}
          {step === 2 && (
            <SelectionStep
              title="トレーニング経験を選択してください"
              options={[
                { label: "初心者", value: "beginner" },
                { label: "中級者", value: "intermediate" },
                { label: "上級者", value: "advanced" },
              ]}
              onSelect={(value) => handleSelect("experience", value)}
            />
          )}
          {step === 3 && (
            <TimeSelection
              onSelect={(value) => handleSelect("duration", value)}
            />
          )}
          {step === 4 && (
            <FrequencySelection
              onSelect={(value) => handleSelect("frequency", value)}
            />
          )}
          {step === 5 && (
            <div style={styles.completeContainer}>
              <div style={styles.completeBox}>
                <h2 style={styles.completeTitle}>プラン作成完了！</h2>
                <p>性別: {formData.gender}</p>
                <p>トレーニング経験: {formData.experience}</p>
                <p>トレーニング時間: {formData.duration}</p>
                <p>トレーニング頻度: {formData.frequency}</p>
                <button style={styles.backButton} onClick={handlePrevStep}>
                  戻る
                </button>
              </div>
            </div>
          )}
          {step > 0 && step < 5 && (
            <button onClick={handlePrevStep}>戻る</button>
          )}
          {step === 4 && (
            <button onClick={handlePlanCreation}>プラン作成</button>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    padding: "0px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    gap: "20px",
    paddingTop: "30vh",
  },
  mainButton: {
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "20px",
    border: "2px solid #4a90e2", // 枠線の追加
    cursor: "pointer",
    width: "80%",
    maxWidth: "400px",
    transition: "background-color 0.3s ease",
    textAlign: "center" as "center",
  },
  mainButtonHover: {
    backgroundColor: "#ffffff",
    color: "#4a90e2",
    border: "2px solid #4a90e2", // 枠線を維持
  },
  subButton: {
    backgroundColor: "#8e44ad",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "20px",
    border: "2px solid #8e44ad", // 枠線の追加
    cursor: "pointer",
    width: "80%",
    maxWidth: "400px",
    transition: "background-color 0.3s ease",
    textAlign: "center" as "center",
  },
  subButtonHover: {
    backgroundColor: "#ffffff",
    color: "#8e44ad", // 背景色と文字色を反転
    border: "2px solid #8e44ad", // 枠線を維持
  },
  completeContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    paddingTop: "70px",
  },
  completeBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    width: "80%",
    maxWidth: "400px",
    marginTop: "0px",
  },
  completeTitle: {
    color: "#4a90e2",
    fontSize: "24px",
    marginBottom: "20px",
  },
  backButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PersonalizePage;
