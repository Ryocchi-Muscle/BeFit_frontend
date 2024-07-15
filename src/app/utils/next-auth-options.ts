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

// Googleのアクセストークンをリフレッシュする関数
async function refreshAccessToken(token: MyToken): Promise<MyToken> {
  console.log("リフレッシュトークン:", token.refreshToken);
  try {
    const url = "https://oauth2.googleapis.com/token";
    const response = await axios.post(url, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 更新されなければ元のリフレッシュトークンを使用
    };
  } catch (error: any) {
    console.error("Error refreshing access token", error.response?.data);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const now = Date.now() / 1000;

      // 初回サインイン
      if (account && account.access_token && user) {
        console.log("Initial sign in, saving token information:");
        console.log({
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at ?? 0) * 1000,
          refreshToken: account.refresh_token,
        });
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at ?? 0) * 1000,
          refreshToken: account.refresh_token,
          uid: user.id,
          user,
        };
      }

      // アクセストークンが有効期限内の場合、そのまま返す
      if (
        typeof token.accessTokenExpires === "number" &&
        now < token.accessTokenExpires
      ) {
        console.log("Access token is still valid, returning existing token.");
        return token;
      }

      console.log("Access token expired, refreshing...");
      return refreshAccessToken(token as MyToken);
    },
    async session({ session, token }: { session: MySession; token: MyToken }) {
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      if (session.user) {
        session.user = {
          ...session.user,
          uid: token.uid as string,
        };
      }
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
