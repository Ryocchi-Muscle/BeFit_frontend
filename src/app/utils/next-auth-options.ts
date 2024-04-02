import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import { Session } from "next-auth";


interface ExtendedSession extends Session {
  // Session型を拡張
  accessToken?: string; // accessTokenプロパティを追加
}

type TokenType = {
  accessToken: string;
  id: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const nextAuthOptions: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession;  token: TokenType}) {
      if (session.user) {
        const token = session.accessToken;
        (session.user as any).id = token?.id; // ユーザーIDをセッションに追加
      }
      // 他のトークン情報（例: accessToken）もここでセッションに追加可能
      return session;
    },
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      const avatar = user?.image;
      try {
        const response = await axios.post(
          `${apiUrl}/auth/${provider}/callback`,
          {
            provider,
            uid,
            name,
            avatar,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
