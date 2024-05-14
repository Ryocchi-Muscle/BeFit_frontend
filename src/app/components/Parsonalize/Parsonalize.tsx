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
            <div>
              <h2>プラン完了！</h2>
              <p>性別: {formData.gender}</p>
              <p>トレーニング経験: {formData.experience}</p>
              <p>トレーニング時間: {formData.duration}</p>
              <p>トレーニング頻度: {formData.frequency}</p>
              {/* ここに作成されたメニューを表示 */}
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
};

export default PersonalizePage;
