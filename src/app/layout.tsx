import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuth";
import { getServerSession } from "next-auth/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "./components/layout/Header";
import { nextAuthOptions } from "./utils/next-auth-options";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be Fit",
  description: "初心者のためのトレーニングアプリ",
  appleWebApp: {
    title: "Apple Web App",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/public/images/thumbnail.png",
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
      <Head>
        <meta name="theme-color" content="#4285f4" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* OGP meta tags */}
        <meta
          property="og:title"
          content="Be Fit - 初心者のためのトレーニングアプリ"
        />
        <meta
          property="og:description"
          content="Be Fitは初心者のためのトレーニングアプリです。"
        />
        <meta property="og:image" content="public/images/thumbnail.png" />
        <meta property="og:url" content="https://www.befitvercel.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Be Fit - 初心者のためのトレーニングアプリ"
        />
        <meta
          name="twitter:description"
          content="Be Fitは初心者のためのトレーニングアプリです。"
        />
        <meta name="twitter:image" content="public/images/thumbnail.png" />
      </Head>
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
