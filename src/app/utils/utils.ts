import axios from "axios";

export const isProgramAlreadyCompletedForDate = async (
  date: string,
  programId: number,
  token: string
): Promise<boolean> => {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/training_records/check_completion/${date}/${programId}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // レスポンスに基づいてプログラムが完了しているかどうかを判断
    return response.data.isCompleted;
  } catch (error) {
    console.error("Error checking program completion:", error);
    return false;
  }
};
