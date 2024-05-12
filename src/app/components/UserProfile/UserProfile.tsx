"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

type UserProfileProps = {
  googleData: {
    name: string;
    imageUrl: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ googleData }) => {
  const [name, setName] = useState(googleData.name);
  const [imageUrl, setImageUrl] = useState(googleData.imageUrl);
  const [editing, setEditing] = useState(false);
  const { data: session } = useSession();

  const handleEdit = () => {
    setEditing(true);
  };

  // const handleSave = async () => {
  //   setEditing(false);
  //   const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user_info/training_records`;
  //   const response = await fetch(endpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Authorization': `Bearer ${session?.accessToken}`,
  //     },
  //     body: JSON.stringify({  name: name }),
  //   });
  //   if (!response.ok) {
  //      throw new Error("Profile update failed");
  //   }

  // };

  return (
    <div className="flex flex-col items-center p-5">
      <Image
        src={imageUrl}
        alt="Profile"
        width={100}
        height={100}
        className="rounded-full"
      />
      {editing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 text-center form-input px-3 py-1 border border-gray-300 rounded-md"
        />
      ) : (
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      )}
      {/* {editing ? (
        <button
          onClick={handleSave}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
      ) : (
        <button
          onClick={handleEdit}
          className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          編集
        </button>
      )} */}
    </div>
  );
};

export default UserProfile;
