import axios, { AxiosResponse, AxiosError } from "axios";
import { getSession } from "next-auth/react";

// 認証トークンをヘッダーに付加するfetcher関数
const fetcherWithAuth = async (path: string) => {
  const session = await getSession();
  console.log("セッション", session);
  const token = session?.accessToken;
  console.log("token", token);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  console.log("ヘッダー", headers);
  const url = path;
  console.log("URL", url);
  return axios
    .get(url, {
      headers: headers,
      withCredentials: true,
    })
    .then((res) => {
      console.log("API Response:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error;
    });
};

export default fetcherWithAuth;
