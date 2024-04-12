import { getSession } from "next-auth/react";

export async function secureApiCall(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body?: object
) {
  const session = await getSession();
  const token = session?.accessToken;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
   const response = await fetch(endpoint, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  });
  return response;
}
