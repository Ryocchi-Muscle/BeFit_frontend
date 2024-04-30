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
    maxAge: 60 * 24 * 24, // JWTの最大有効期限を秒で指定（ここでは30日）
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
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
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,
          {
            provider,
            uid,
            name,
          }
        );
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
