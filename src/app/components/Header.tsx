"use client";

import Image from "next/image";
import React from "react";
import { type Session } from "next-auth";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";

// const Header = () => {
//   // ボタンクリック時に呼び出される関数
//   const handleClick = () => {
//     alert("ボタンがクリックされました！");
//   };
//   return (
//     <header className="bg-gray-200 text-black p-4 mt-4 text-center flex justify-between items-center w-full h-20">
//       <div className="flex-1">
//         <Link href="/signup" className="btn flex-1 text-center">
//           新規登録
//         </Link>
//         <Link href="/login" className="btn flex-1 text-center">
//           ログイン
//         </Link>
//         {/* ボタンコンポーネントに onClick イベントハンドラを追加 */}
//         <div className="flex-1">
//           <Button onClick={handleClick}>ゲストログイン</Button>
//         </div>
//       </div>
//     </header>
//   );
// };

const Header = ({ session }: { session: Session | null }) => {
  const guestLogin = () => {
    console.log("ゲストとしてログイン");
  };

  return (
    <header className="flex items-center justify-between bg-blue-950 p-4 shadow-md">
      <div className="flex items-center">
        <Link href="/" className="text-4xl font-bold">
          FitApp
        </Link>
      </div>
      <ul className="flex items-center space-x-4">
        {session ? (
          <>
            <li>
              <Image
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
                width={40}
                height={40}
                className="rounded-full"
              />
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
              >
                ログアウト
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              {/* ゲストログインボタン */}
              <button
                onClick={(guestLogin) =>
                  signIn("credentials", { callbackUrl: "/layout/record" })
                }
                className="rounded-lg bg-green-500 px-4 py-[7px] text-white hover:bg-gray-600"
              >
                ゲストログイン
              </button>
            </li>
            <li>
              <Link href="/login">
                <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600">
                  ログイン
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
export default Header;
