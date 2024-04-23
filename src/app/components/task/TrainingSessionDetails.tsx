// components/TrainingSessionDetails.tsx
// データの表示するコンポーネント
'use client';
import React from "react";
import { useTrainingSession } from "@/app/hooks/useTrainingSession";


const TrainingSessionDetails: React.FC<{ sessionId: number }> = ({
  sessionId,
}) => {
  console.log(sessionId);
  const { sessionData, isLoading, isError } = useTrainingSession(sessionId);
console.log("sessionData", sessionData)
  if (isLoading) return <div>Loading...</div>;
  if (isError || !sessionData) return <div>Error!</div>;

  return (
    <div>
      <p>Start Date: {sessionData.training_session.start_date}</p>
      <p>DAY: {sessionData.days_info.elapsed_days}</p>
    </div>
  );
};

export default TrainingSessionDetails;
