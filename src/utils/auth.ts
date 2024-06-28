import { getSession } from "next-auth/react";
import axios from "axios";

export const fetchWithToken = async (
  url: string,
  fetcher: (url: string, token: string) => Promise<any>
) => {
  let session = await getSession();

  if (!session) {
    throw new Error("Session not found");
  }

  let accessToken = session.accessToken as string;
  const now = Date.now() / 1000;

  console.log("Current Access Token:", accessToken);
  console.log("Access Token Expires At:", session.accessTokenExpires);
  console.log("Current Time:", now);

  // アクセストークンの有効期限が切れている場合にリフレッシュ
  if (session.accessTokenExpires && now > session.accessTokenExpires) {
    console.log("Access token expired, refreshing token.");
    const refreshedSession = await refreshAccessToken(session);
    if (refreshedSession.error) {
      throw new Error("Failed to refresh access token");
    }
    accessToken = refreshedSession.accessToken;
    console.log("Refreshed Access Token:", accessToken);
  } else {
    console.log("Access token is still valid.");
  }

  return fetcher(url, accessToken);
};

const refreshAccessToken = async (session: any) => {
  console.log("refreshAccessToken function called."); // デバッグ用ログ
  try {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ||
      process.env.GOOGLE_CLIENT_SECRET;

    // ログを追加して環境変数が正しく読み込まれているか確認
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);

    if (!clientId || !clientSecret) {
      throw new Error("Client ID or Client Secret is missing.");
    }
    const url =
      `https://oauth2.googleapis.com/token?` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
      `client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&` +
      `grant_type=refresh_token&` +
      `refresh_token=${session.refreshToken}`;

    console.log("Refreshing token with URL:", url);

    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to refresh access token: ${response.status} ${response.statusText}`
      );
    }

    const refreshedTokens = response.data;

    console.log("Received refreshed tokens:", refreshedTokens);

    // セッションを更新する
    session.accessToken = refreshedTokens.access_token;
    session.accessTokenExpires = Date.now() + refreshedTokens.expires_in * 1000;
    session.refreshToken =
      refreshedTokens.refresh_token ?? session.refreshToken;

    return session;
  } catch (error) {
    const typedError = error as any;
    console.error(
      "Error refreshing access token:",
      typedError.message,
      typedError.response?.data
    );
    return { error: "RefreshAccessTokenError" };
  }
};
