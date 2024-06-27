import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuth";
import { getServerSession } from "next-auth/next";
import { GoogleAnalytics } from "@next/third-parties/google";

import Header from "./components/layout/Header";
import { nextAuthOptions } from "./utils/next-auth-options";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be Fit",
  description: "初心者のためのトレーニングアプリ",
  appleWebApp: {
    title: "Apple Web App",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/public/images/Pasted Graphic.png",
      {
        url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="ja">
      <head>
        {/* ブルー系のステータスバー色を設定 */}
        <meta name="theme-color" content="#4285f4" />
        {/* ここでブルー系の色を指定 */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body className={`${inter.className} pt-10`}>
        <NextAuthProvider>
          <Header session={session} />
          <main className="flex flex-col min-h-screen overflow-y-auto">
            {children}
            <GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
          </main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
