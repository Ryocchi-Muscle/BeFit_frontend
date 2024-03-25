"use client";

import Image from "next/image";
import React from "react";
import { type Session } from "next-auth";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import Login from "./Login";
import { useSession } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
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
            <li></li>
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
