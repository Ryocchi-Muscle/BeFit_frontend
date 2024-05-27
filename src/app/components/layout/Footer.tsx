"use client";
import React from "react";
import { FaRegCalendar, FaHistory, FaDumbbell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Footer: React.FC<Props> = ({ children, className }) => {
  const pathname = usePathname();
  const combinedClassName = `fixed inset-x-0 bottom-0 ${className}`;

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-200 rounded-full p-2" : "";
  };

  return (
    <div className={combinedClassName}>
      <main>{children}</main>
      <footer className="bg-white text-black p-4 shadow-md border-t border-black">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex flex-grow justify-evenly">
            <li>
              <Link
                href="/category/dashboard"
                className={`flex items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/record"
                )}`}
              >
                <FaHistory className="text-black" />
              </Link>
            </li>
            <li>
              <Link
                href="/category/calendar"
                className={`flex items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/calendar"
                )}`}
              >
                <FaRegCalendar className="text-black" />
              </Link>
            </li>
            <li>
              <Link
                href="/category/training"
                className={`flex items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/training"
                )}`}
              >
                <FaDumbbell className="text-black" />
              </Link>
            </li>
            <li>
              <Link
                href="/category/user_info"
                className={`flex items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/user_info"
                )}`}
              >
                <IoPerson className="text-black" />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
