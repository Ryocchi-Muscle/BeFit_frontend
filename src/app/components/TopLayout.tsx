// src/app/components/TopLayout.tsx

import React from "react";

const TopLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between">
          <div>ロゴ</div>
          <ul className="flex space-x-4">
            <li>
              <button>ゲストログイン</button>
            </li>
            <li>
              <button>ログイン</button>
            </li>
            <li>
              <button>新規登録</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
     
      <footer className="bg-white text-black p-4 shadow-md mt-auto border-t border-black">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex flex-grow justify-evenly">
            <li>
              <a href="/layout/record" className="hover:underline text-black">
                記録
              </a>
            </li>
            <li>
              <a href="/layout//mission" className="hover:underline text-black">
                日々のミッション
              </a>
            </li>
            <li>
              <a
                href="/layout//training"
                className="hover:underline text-black"
              >
                トレーニング
              </a>
            </li>
            <li>
              <a href="/layout/search" className="hover:underline text-black">
                動画検索
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default TopLayout;
