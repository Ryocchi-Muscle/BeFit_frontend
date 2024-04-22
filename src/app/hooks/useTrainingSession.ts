// トレーニングセッションの詳細と経過日数、残り日数をフェッチするカスタムフック
"use client";
import { mutate } from "swr";
import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

interface TrainingSession {
  training_session: {
    id: number;
    userId: number;
    start_date: string;
  };
  elapsed_days: number;
  remaining_days: number;
}

const fetcher = ([url, token]: [string, string]) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(url, { headers }).then((res) => res.data);
};

export function useTrainingSession(sessionId: number) {
  const { data: session } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = session?.accessToken;
  const url = `${apiUrl}/api/v1/training_sessions/${sessionId}`;
  const REFRESH_INTERVAL_MS = 3600000; // 1時間ごとに再取得
  console.log("URL", url);

  // useSWRの呼び出しを調整し、トークンを配列の一部として直接fetcherに渡す
  const { data, error, mutate } = useSWR([url, token], fetcher, {
    refreshInterval: REFRESH_INTERVAL_MS,
  });

  console.log("データ", data);
  console.log(error);
  return {
    sessionData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
