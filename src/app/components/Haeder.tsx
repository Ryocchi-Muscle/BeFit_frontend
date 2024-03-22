"use client";
import React from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import Button from "../Button.client";

const Header = () => {
  // ボタンクリック時に呼び出される関数
  const handleClick = () => {
    alert("ボタンがクリックされました！");
  };
  return (
    <header className="bg-gray-200 text-black p-4 mt-4 text-center flex justify-between items-center w-full h-20">
      <div className="flex-1"></div>
      <Link href="/signup" className="btn flex-1 text-center">
        新規登録
      </Link>
      <Link href="/login" className="btn flex-1 text-center">
        ログイン
      </Link>
      {/* ボタンコンポーネントに onClick イベントハンドラを追加 */}
      <div className="flex-1">
        <Button onClick={handleClick}>
          ゲストログイン
        </Button>
      </div>
    </header>
  );
};

export default Header;
