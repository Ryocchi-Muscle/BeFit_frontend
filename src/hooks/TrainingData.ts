import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { fetchWithToken } from "@/utils/auth";

const REFRESH_INTERVAL_MS = 3600000;

const fetcher = async (url: string) => {
  return fetchWithToken(url, async (url: string, token: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  });
};

const useTrainingData = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/api/v2/training_records`;
  const token = session?.accessToken;
  console.log("Session status:", status);
  console.log("Session data:", session);

  const { data, error } = useSWR(session ? url : null, fetcher, {
    refreshInterval: REFRESH_INTERVAL_MS,
  });
  console.log("Fetched data:", data);
  console.log("Fetch error:", error);

  return {
    data,
    isLoading: status === "loading" || (!error && !data),
    isError: error,
  };
};

export default useTrainingData;
