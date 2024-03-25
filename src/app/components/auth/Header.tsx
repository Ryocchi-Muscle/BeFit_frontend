import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { currentUser, login } = useAuth();

  return (
    <header>
      <nav>
        {!currentUser ? (
          <>
            <button>ログイン</button>
            <button>新規登録</button>
            <button>ゲストログイン</button>
          </>
        ) : (
          <button>ログアウト</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
