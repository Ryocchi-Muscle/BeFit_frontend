import React from "react";
import Footer from "@/app/components/layout/Footer";
import UserProfile from "@/app/components/UserProfile/UserProfile";

type GoogleData = {
  name: string;
  imageUrl: string;
};

interface UserProfileProps {
  userId: string;
  googleData: GoogleData;
}

const googleData = {
  name: "Ryo Ninomiya",
  imageUrl: "https://via.placeholder.com/150",
};

export default function userInfoPage() {
  const userId = "1";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <UserProfile googleData={googleData} />
        <Footer />
      </div>
    </div>
  );
}
