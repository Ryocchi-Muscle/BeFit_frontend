import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface MySession extends Session {
  accessToken?: string;
  user_id?: string;
  accessTokenExpires?: number;
}

interface MyToken extends JWT {
  id?: string;
  accessToken?: string;
  user_id?: string;
  accessTokenExpires?: number;
  refreshToken?: string;
}

export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const now = Date.now() / 1000;

      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000; // 修正: 有効期限の単位がミリ秒、デフォルトで1時間
        token.refreshToken = account.refresh_token;
      }

      // アクセストークンの有効期限が近づいている場合
      if (
        typeof token.accessTokenExpires === "number" &&
        now > token.accessTokenExpires
      ) {
        console.log("Access token expired, refreshing token.");
        return refreshAccessToken(token);
      }

      // アクセストークンが有効期限内の場合、そのまま返す
      console.log("Access token valid, returning existing token.");
      return token;
    },
    async session({ session, token }: { session: MySession; token: MyToken }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires; // 修正: 有効期限をセッションに追加
      session.user_id = token.id;
      return session;
    },
    async signIn({ user, account }) {
      if (!account) return false;
      const provider = account.provider;
      const uid = user.id;
      const name = user.name;
      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,
          {
            provider,
            uid,
            name,
          }
        );
        console.log("signIn response", response.data);
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("エラー", error);
        return false;
      }
    },
  },
};

async function refreshAccessToken(token: MyToken) {
  try {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    const clientSecret =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ||
      process.env.GOOGLE_CLIENT_SECRET;

    // ログを追加して環境変数が正しく読み込まれているか確認
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);
    const url =
      `https://oauth2.googleapis.com/token?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `client_secret=${process.env.GOOGLE_CLIENT_SECRET}&` +
      `grant_type=refresh_token&` +
      `refresh_token=${token.refreshToken}`;

    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status !== 200) {
      throw response.data;
    }

    const refreshedTokens = response.data;
    console.log("Received refreshed tokens:", refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 必要に応じて新しいリフレッシュトークン
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
