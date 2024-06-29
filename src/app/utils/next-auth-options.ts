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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const now = Date.now() / 1000;

      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 10
          : Date.now() + 10; // 修正: 有効期限の単位がミリ秒、デフォルトで1時間
        token.refreshToken = account.refresh_token;
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


