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

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

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
          {step === 0 && <StartButton onClick={handleNextStep} />}
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
    padding: "20px",
  },
  // 新しいスタイルを追加
  completeContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    // backgroundColor: "#f0f0f0",
  },
  completeBox: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    width: "80%",
    maxWidth: "400px",
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
