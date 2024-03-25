// import NextAuth from "next-auth";
// import { nextAuthOptions } from "@/app/utils/next-auth-options";
// const handler = NextAuth(nextAuthOptions);
// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});
export { handler as GET, handler as POST };
