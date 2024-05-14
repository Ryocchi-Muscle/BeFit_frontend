"use client";
import React, { useState } from "react";
import StartButton from "./StartButton";

const Parsonalize = () => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => setStep(step + 1);
  return (
    <div>
      <StartButton onClick={handleNextStep} />
    </div>
  );
};

export default Parsonalize;
