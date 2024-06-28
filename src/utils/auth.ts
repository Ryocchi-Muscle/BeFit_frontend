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

  // アクセストークンの有効期限が切れている場合にリフレッシュ
  if (session.accessTokenExpires && now > session.accessTokenExpires) {
    const refreshedSession = await refreshAccessToken(session);
    if (refreshedSession.error) {
      throw new Error("Failed to refresh access token");
    }
    accessToken = refreshedSession.accessToken;
  }

  return fetcher(url, accessToken);
};

const refreshAccessToken = async (session: any) => {
  try {
    const url =
      `https://oauth2.googleapis.com/token?` +
      `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
      `client_secret=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}&` +
      `grant_type=refresh_token&` +
      `refresh_token=${session.refreshToken}`;

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
