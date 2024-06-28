import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface MySession extends Session {
  accessToken?: string;
  user_id?: string;
}

interface MyToken extends JWT {
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
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refresh_token;
      }

      // アクセストークンの有効期限が近づいている場合
      if (
        typeof token.accessTokenExpires === "number" &&
        now < token.accessTokenExpires
      ) {
        return token;
      }

      // アクセストークンをリフレッシュする
      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: MySession; token: MyToken }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token.user_id) {
        session.user_id = token.user_id;
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

async function refreshAccessToken(token: MyToken) {
  try {
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

    const refreshedTokens = response.data;

    if (response.status !== 200) {
      throw refreshedTokens;
    }

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
