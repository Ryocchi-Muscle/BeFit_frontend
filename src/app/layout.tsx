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
  metadataBase: new URL("https://www.befitvercel.com/"),
  title: "Be Fit",
  description: "Be Fit | 筋トレサポートトレーニングアプリ",
  openGraph: {
    title: "Be Fit | 筋トレサポートトレーニングアプリ",
    description: "筋トレサポートアプリ",
    siteName: "Be Fit",
    images: "https://www.befitvercel.com/images/thumbnail.png",
  },
  twitter: {
    title: "Be Fit | 筋トレサポートトレーニングアプリ",
    description: "筋トレサポートアプリ",
    card: "summary_large_image",
    images: "https://www.befitvercel.com/images/thumbnail.png",
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
