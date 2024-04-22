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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !sessionData) return <div>Error!</div>;

  return (
    <div>
      <h1>Training Session Details</h1>
      <p>Start Date: {sessionData.training_session.start_date}</p>
      <p>Elapsed Days: {sessionData.elapsed_days}</p>
      <p>Remaining Days: {sessionData.remaining_days}</p>
    </div>
  );
};

export default TrainingSessionDetails;
