import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

const fetcher = async ([url, token]: [string, string | undefined]) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(url, { headers }).then((res) => res.data);
};

export function useUser() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profiles`, token],
    fetcher
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}
