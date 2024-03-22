import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// showFooter プロパティを追加します（デフォルトは true とします）\\

export const metadata: Metadata = {
  title: "FitAPP",
  description: "Fitness app",
};

export default function RootLayout({ children, showFooter = false }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        {/* <header className="bg-blue-500 text-white p-4 shadow-md border-b border-black">
          <nav className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-3xl font-bold ">
              FitAPP
            </a>
          </nav>
        </header> */}
        {children}
        {/* showFooter が true の場合のみフッターを表示します */}
        {/* {showFooter && (
          <footer className="bg-gray-200 text-black p-4 mt-auto ">
            @Ryocchi-Muscle
          </footer>
        )} */}
      </body>
    </html>
  );
}
