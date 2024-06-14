import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuth";
import { getServerSession } from "next-auth/next";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "./components/layout/Header";
import { nextAuthOptions } from "./utils/next-auth-options";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "筋トレアプリ",
  description: "fitness app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="ja">
      <GoogleTagManager gtmId={process.env.GA_ID ?? ""} />
      <body className={`${inter.className} pt-10`}>
        <NextAuthProvider>
          <Header session={session} />
          <main className="flex flex-col min-h-screen"> {children}</main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
