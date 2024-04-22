import useSWR from "swr";
import axios from "axios";

interface TrainingSession {
  id: number;
  userId: number;
  startDate: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useTrainingSession(userId: number) {
  const { data, error, mutate } = useSWR<TrainingSession>(
    `/api/v1/training_sessions/${userId}`,
    fetcher
  );

  return {
    session: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
