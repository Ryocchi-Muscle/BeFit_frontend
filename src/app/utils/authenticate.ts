import axios, { AxiosResponse, AxiosError } from "axios";
import { getSession } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// 認証トークンをヘッダーに付加するfetcher関数
const authenticateUser = async (provider: string, uid: string, name: string) => {
  const session = await getSession();
  console.log("session", session);
  const token = session?.accessToken;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/auth/${provider}/callback`;
  console.log("url", url);
  return axios
    .post(url, {
      headers: headers,
      withCredentials: true,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((error: AxiosError) => {
      throw error;
    });
};

export default authenticateUser;
