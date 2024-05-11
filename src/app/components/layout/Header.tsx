"use client";

import Image from "next/image";
import React from "react";
import { type Session } from "next-auth";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { signOut } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-blue-950 shadow-md p-2 lg:p-4">
      <div className="flex items-center">
        <Link href="/" className="text-4xl  text-white font-bold">
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
              <Link href="account/login">
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
