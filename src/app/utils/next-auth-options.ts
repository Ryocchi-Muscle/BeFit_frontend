import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account }) {
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
