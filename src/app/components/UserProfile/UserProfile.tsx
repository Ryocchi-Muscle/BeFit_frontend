// UserProfile.tsx
"use client";
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

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="flex flex-col items-center p-5">
      <Image
        src={imageUrl}
        alt="Profile"
        width={150}
        height={150}
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
      {editing ? (
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
      )}
    </div>
  );
};

export default UserProfile;
