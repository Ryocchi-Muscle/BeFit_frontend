"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
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

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/account/login";
  const { data: session } = useSession();
  const userUid = session?.user?.uid;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { toast } = useToast();

  const handleDeleteAccount = async () => {
    console.log("Session data:", session);
    console.log("userUid:", userUid);
    console.error("userUid", userUid);
    if (!userUid) {
      toast({
        title: "ユーザーUIDが見つかりません。",
        duration: 3000,
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const endpoint = `${apiUrl}/api/v1/users/${userUid}`;

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        signOut({ callbackUrl: "/?success=accountDeleted" });
      } else {
        toast({
          title: "退会処理に失敗しました。",
          duration: 3000,
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } catch (error) {
      console.error("退会処理に失敗しました:", error);
      toast({
        title: "退会処理に失敗しました。",
        duration: 3000,
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-blue-950 shadow-md p-2 lg:p-4 z-10">
        <div className="flex items-center">
          <Image
            src="/images/Pasted Graphic.png"
            alt="Be Fit Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <p className="text-4xl text-white font-bold">Be Fit</p>
        </div>
        <ul className="flex items-center space-x-2">
          {session ? (
            <>
              <li>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="flex items-center text-white hover:text-gray-300">
                      <IoPersonCircleSharp size={30} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-md max-w-xs rounded-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle>退会</AlertDialogTitle>
                      <AlertDialogDescription>
                        アカウントを削除すると、これまでのデータは全て削除され、復元できなくなります。この操作は取り消せません。本当にアカウントを削除してもよろしいですか？
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-between mt-4">
                      <div className="flex justify-center space-x-4">
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          退会する
                        </AlertDialogAction>
                        <AlertDialogCancel className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600">
                          キャンセル
                        </AlertDialogCancel>
                      </div>
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
    </>
  );
};

export default Header;
