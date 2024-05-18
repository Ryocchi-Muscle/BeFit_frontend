import { Settings } from "@/setting";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const API_URL = Settings.API_URL;

const useApiClient = () => {
  const { data: session } = useSession();

  const client = React.useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    instance.interceptors.request.use((config) => {
      if (typeof window === "undefined") return config;

      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const expiry = localStorage.getItem("expiry");

      if (accessToken && client && uid && expiry) {
        config.headers["access-token"] = accessToken;
        config.headers.client = client;
        config.headers.uid = uid;
        config.headers.expiry = expiry;
      }

      return config;
    });

    return instance;
  }, [session?.accessToken]);

  return client;
};

export default useApiClient;
