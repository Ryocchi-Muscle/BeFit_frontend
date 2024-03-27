import React, { useEffect, ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = useAuth()?.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return currentUser ? <>{children}</> : null;
};

export default ProtectedRoute;
