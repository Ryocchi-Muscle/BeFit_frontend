"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";


interface User {
  id: string;
  name: string;
  email: string;
}


interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
}

// デフォルトの認証コンテキスト値を設定
const defaultContextValue: AuthContextType = {
  currentUser: null,
  login: async () => {
    console.warn("login function not implemented");
  },
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);


export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email: string, password: string) => {
    // ログイン処理
  };

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
ponyo
