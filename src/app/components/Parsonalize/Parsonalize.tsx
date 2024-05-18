"use client";

import React, { useState } from "react";
import SelectionStep from "./SelectionStep";
import LoadingScreen from "./LoadingScreen";
import ProgramCard from "./ProgramCard";
import { useSession } from "next-auth/react";

interface Program {
  title: string;
  image: string;
  details: string[];
}

const PersonalizePage: React.FC = () => {
  const { data: session } = useSession();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: "",
    frequency: "",
  });
  const [loading, setLoading] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [program, setProgram] = useState<Program[]>([]);

  const handleNextStep = () => setStep(step + 1);
  console.log("step", step);
  const handlePrevStep = () =>
    setStep((prevStep) => (prevStep === 4 ? 0 : prevStep - 1));

  const handleSelect = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    handleNextStep();
  };

  const handlePlanCreation = async () => {
    setLoading(true);
    // プラン作成処理を実行（例：API呼び出し）
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${apiUrl}/api/v2/personalized_menus`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          gender: formData.gender,
          frequency: formData.frequency,
        }),
      });

      if (!response.ok) {
        throw new Error("APIエラーが発生しました");
      }
      console.log("response", response);
      const data = await response.json();
      setProgram(data.program as Program[]);
    } catch (error) {
      console.error("エラーが発生しました: ", error);
    } finally {
      setLoading(false);
      handleNextStep();
    }
  };

  const handleCombinedClick = async () => {
    setStep(4);
    await handlePlanCreation();
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
                onClick={() => alert("記録")}
                onMouseEnter={() => setHoveredButton("sub")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                記録
              </button>
            </div>
          )}
          {step === 1 && (
            <SelectionStep
              title="性別を選択してください"
              options={[
                {
                  label: "男",
                  value: "male",
                  icon: "/Parsonalize/images.jpeg",
                },
                {
                  label: "女",
                  value: "female",
                  icon: "/Parsonalize/images.jpeg",
                },
              ]}
              onSelect={(value) => handleSelect("gender", value)}
            />
          )}
          {step === 2 && (
            <SelectionStep
              title="トレーニング頻度を選択してください"
              options={[
                { label: "週1", value: "1" },
                { label: "週2-3", value: "2-3" },
                { label: "週4~6", value: "4-6" },
              ]}
              onSelect={(value) => handleSelect("frequency", value)}
            />
          )}
          {step === 3 && (
            <div style={styles.completeContainer}>
              <div style={styles.completeBox}>
                <h2 style={styles.completeTitle}>プラン作成完了！</h2>
                <p>性別: {formData.gender}</p>
                <p>トレーニング頻度: {formData.frequency}</p>
                {step === 3 && (
                  <button
                    style={styles.viewPlanButton}
                    onClick={handleCombinedClick}
                  >
                    作成されたプランを確認する
                  </button>
                )}
                <button style={styles.backButton} onClick={handlePrevStep}>
                  戻る
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div style={styles.programContainer}>
              <h2 style={styles.programTitle}>作成されたプログラム</h2>
              <div style={styles.programList}>
                {program.map((item, index) => (
                  <ProgramCard
                    key={index}
                    title={item.title}
                    image={item.image}
                    details={item.details}
                  />
                ))}
              </div>
              <button style={styles.backButton} onClick={handlePrevStep}>
                戻る
              </button>
            </div>
          )}
          {step > 0 && step < 3 && (
            <button onClick={handlePrevStep}>戻る</button>
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
  viewPlanButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4a90e2",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  programContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100vh",
    paddingTop: "70px",
  },
  programTitle: {
    color: "#4a90e2",
    fontSize: "24px",
    marginBottom: "20px",
  },
  programCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  programImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  programList: {
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
  },
};

export default PersonalizePage;
