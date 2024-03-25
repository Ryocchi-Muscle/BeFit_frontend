import React from "react";

type Props = {
  children?: React.ReactNode;
};

const Footer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col fixed bottom-0 w-screen">
      <main>{children}</main>
      <footer className="bg-white text-black p-4 shadow-md  border-t border-black ">
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

export default Footer;
