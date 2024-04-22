"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useTrainingSession } from "../hooks/useTrainingSession";

interface Props {
  userId: number;
}

const StartDateForm: React.FC<Props> = ({ userId }) => {
  const { mutate } = useTrainingSession(userId);
  const [startDate, setStartDate] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/training_sessions/${userId}`, {
        start_date: startDate,
      });
      mutate({ ...response.data }, false); // false to not re-fetch
    } catch (error) {
      console.error("Failed to submit start date:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="start-date">トレーニング開始日</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      ←トレーニング開始日を設定
    </form>
  );
};

export default StartDateForm;
