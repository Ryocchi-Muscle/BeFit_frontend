import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";



export const metadata: Metadata = {
  title: "FitAPP",
  description: "Fitness app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">{children}</body>
    </html>
  );
}
