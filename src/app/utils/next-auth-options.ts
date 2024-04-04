import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";
import { Session } from "next-auth";
import jwt from "jsonwebtoken";


interface ExtendedSession extends Session {
  jwtToken?: string; // jwtTokenプロパティを追加
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function isStringOrUndefined(value: unknown): value is string | undefined {
  return typeof value === "string" || value === undefined;
}

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
        token.jwtToken = jwt.sign(
          { uid: user.id },
          process.env.NEXTAUTH_SECRET!,
          { algorithm: "HS256" }
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token?.id; // ユーザーIDをセッションに追加
        if (isStringOrUndefined(token?.jwtToken)) {
          const customSession: ExtendedSession = {
            ...session,
            jwtToken: token?.jwtToken, // JWTトークンをセッションに追加
          };return customSession;
        }
      }
      // 他のトークン情報（例: accessToken）もここでセッションに追加可能
      return session;
    },
    async signIn({ user, account }) {
      const provider = account?.provider;
      const uid = user?.id;
      const name = user?.name;
      try {
      const response = await axios.post(
        `${apiUrl}/auth/${provider}/callback`,
        {
          // リクエストボディ
          provider,
          uid,
          name,
        },
        {
          // リクエスト設定（ヘッダーを含む）
          // headers: {
          //   Authorization: `Bearer ${session.jwtToken}`, // この時点でセッションオブジェクトが存在しない
          // },
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
