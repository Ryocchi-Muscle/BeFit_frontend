"use client";
import React from "react";
import {
  FaRegCalendar,
  FaHistory,
  FaDumbbell,
  FaClipboardList,
} from "react-icons/fa";

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
    return pathname === path ? "bg-gray-300 rounded-full" : "";
  };

  return (
    <div className={combinedClassName}>
      <main>{children}</main>
      <footer className="bg-white text-black p-4 shadow-md border-t border-gray">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex justify-between w-full max-w-2xl mx-auto">
            <li className="flex flex-col items-center">
              <Link
                href="/category/record"
                className={`flex flex-col items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/record"
                )}`}
                legacyBehavior
              >
                <span className="flex flex-col items-center justify-center">
                  <FaHistory
                    className={`w-5 h-5 mb-1 ${isActive("/category/record")}`}
                  />
                  <span className={`text-xs ${isActive("/category/record")}`}>
                    Record
                  </span>
                </span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="/category/program"
                className={`flex flex-col items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/program"
                )}`}
                legacyBehavior
              >
                <span className="flex flex-col items-center justify-center">
                  <FaClipboardList
                    className={`w-5 h-5 mb-1 ${isActive("/category/program")}`}
                  />
                  <span className={`text-xs ${isActive("/category/program")}`}>
                    Program
                  </span>
                </span>
              </Link>
            </li>
            <li className="flex flex-col items-center">
              <Link
                href="/category/calendar"
                className={`flex flex-col items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/calendar"
                )}`}
                legacyBehavior
              >
                <span className="flex flex-col items-center justify-center">
                  <FaRegCalendar
                    className={`w-5 h-5 mb-1 ${isActive("/category/calendar")}`}
                  />
                  <span className={`text-xs ${isActive("/category/calendar")}`}>
                    Calendar
                  </span>
                </span>
              </Link>
            </li>

            <li className="flex flex-col items-center">
              <Link
                href="/category/training"
                className={`flex flex-col items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/training"
                )}`}
                legacyBehavior
              >
                <span className="flex flex-col items-center justify-center">
                  <FaDumbbell
                    className={`w-5 h-5 mb-1 ${isActive("/category/training")}`}
                  />
                  <span className={`text-xs ${isActive("/category/training")}`}>
                    Guide
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
