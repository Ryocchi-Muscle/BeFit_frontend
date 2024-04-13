import { getSession } from "next-auth/react";
import { ApiResponse } from "../../../types/api";

// APIを呼び出す関数の定義
export async function secureApiCall<T>(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: object
): Promise<ApiResponse<T>> {
  //セッションと認証トークンの取得
  const session = await getSession();
  const token = session?.accessToken;

  // ヘッダーの設定;
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  // リクエスト設定
  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
  // GETメソッドではボディが不要なため、ボディを削除してる。
  if (method === "GET") {
    delete config.body;
  }
  // API呼び出しとエラーハンドリング
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    config
  );
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }
  const data: T = await response.json();
  return { data };
}
