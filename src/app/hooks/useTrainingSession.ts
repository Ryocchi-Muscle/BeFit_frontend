// トレーニングセッションの詳細と経過日数、残り日数をフェッチするカスタムフック
import useSWR, { mutate } from "swr";
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

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useTrainingSession(sessionId: number) {
  const { data, error } = useSWR<TrainingSession>(
    `/api/v1/training_sessions/${sessionId}`,
    fetcher
  );
  console.log(data);
  return {
    sessionData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
