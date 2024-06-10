import axios from "axios";
import { FetchError } from "./errors";

export const fetcher = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorInfo = error.response.data;
      throw new FetchError(
        "エラーが発生しました",
        errorInfo,
        error.response.status
      );
    } else {
      throw new FetchError("ネットワークエラーが発生しました", {}, 0);
    }
  }
};
