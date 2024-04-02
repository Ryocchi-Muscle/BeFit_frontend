import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";



export const fetchProtectedData = async (url: string): Promise<any> => {
  const session: Session | null = await getSession();

  if (!session || !session.accessToken) {
    throw new Error("セッションが見つかりません。ログインしてください。");
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("APIリクエストに失敗しました: ", error);
    throw error;
  }
};
