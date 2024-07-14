"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { type Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/account/login";
  const [clientSession, setClientSession] = useState<Session | null>(null);

  useEffect(() => {
    setClientSession(session);
  }, [session]);

  const handleDeleteAccount = async () => {
    const confirmed = confirm("本当に退会しますか？");
    if (confirmed) {
      try {
        // 退会処理のロジックをここに追加する
        // 例：await deleteAccount();

        signOut({ callbackUrl: "/" });
      } catch (error) {
        console.error("退会処理に失敗しました:", error);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex items-center justify-between bg-blue-950 shadow-md p-2 lg:p-4 z-10`}
    >
      <div className="flex items-center">
        <Image
          src="/images/Pasted Graphic.png"
          alt="Be Fit Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <p className="text-4xl  text-white font-bold">Be Fit</p>
      </div>
      <ul className="flex items-center space-x-2">
        {clientSession ? (
          <>
            <li>
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="flex items-center text-white hover:text-gray-300">
                    <IoPersonCircleSharp size={30} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm p-4 rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>退会</AlertDialogTitle>
                    <AlertDialogDescription>
                      アカウントを削除すると、これまでのデータは全て削除され、復元できなくなります。
                      <br />
                      この操作は取り消せません。 <br />
                      本当にアカウントを削除してもよろしいですか？
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex justify-between">
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>
                      退会する
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
        ) : !isLoginPage ? (
          <>
            <li>
              <Link href="account/login" legacyBehavior>
                <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600">
                  ログイン
                </button>
              </Link>
            </li>
          </>
        ) : null}
      </ul>
    </header>
  );
};

export default Header;
