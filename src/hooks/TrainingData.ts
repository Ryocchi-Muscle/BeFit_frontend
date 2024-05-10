import { useSession } from "next-auth/react";
import useSWR from "swr";

interface TrainingRecord {
  id: number;
  date: string;
  total_weight: number;
}

const useTrainingData = () => {
  const { data: session } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/v2/training_records`;

  const fetcher = async (url: string) => {
    if (!session?.accessToken) {
      throw new Error("Unauthorized");
    }
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, error } = useSWR<TrainingRecord[], Error>(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTrainingData;
