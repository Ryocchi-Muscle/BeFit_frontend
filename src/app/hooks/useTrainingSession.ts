// トレーニングセッションの詳細と経過日数、残り日数をフェッチするカスタムフック
"use client";
import { mutate } from 'swr';
import useSWR from "swr";
import axios from "axios";

interface TrainingSession {
  training_session: {
    id: number;
    userId: number;
    start_date: string;
  };
  elapsed_days: number;
  remaining_days: number;
}

const fetcher = (url: string) =>
  axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then((res) => res.data);


export function useTrainingSession(sessionId: number) {
  const { data, error } = useSWR<TrainingSession>(
    `/api/v1/training_sessions/${sessionId}`,
    fetcher
  );
  console.log(data);
  console.log(error);
  return {
    sessionData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
