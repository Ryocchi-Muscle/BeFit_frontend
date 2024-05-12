"use client";

import React from "react";
import Footer from "@/app/components/layout/Footer";
import UserProfile from "@/app/components/UserProfile/UserProfile";
import { useSession } from "next-auth/react";

export default function UserInfoPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;

  if (!session || !session.user) {
    return <p>Please login to view this page.</p>;
  }

  const googleData = {
    name: session.user.name || "", // ユーザー名が無ければデフォルト値を使用
    imageUrl: session.user.image || "https://via.placeholder.com/150", // セッションから画像URLを
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <UserProfile googleData={googleData} />
        <Footer />
      </div>
    </div>
  );
}
