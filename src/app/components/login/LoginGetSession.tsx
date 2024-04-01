import { getSession } from "next-auth/react";


export default async function getProtectedData() {
  const session = await getSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  type Session = {
    accessToken: string; // accessTokenプロパティを追加
  };

  if (!session) {
    throw new Error("User not logged in");
  }

  const response = await fetch(`${apiUrl}/protected-resource`, {
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`, // Access the accessToken property from the session object
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch protected data");
  }

  return await response.json();
}
