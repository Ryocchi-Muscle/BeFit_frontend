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
    return pathname === path ? "bg-gray-300 rounded-full" : "";
  };

  return (
    <div className={combinedClassName}>
      <main>{children}</main>
      <footer className="bg-white text-black p-4 shadow-md border-t border-gray">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex flex-grow justify-evenly gap-14">
            <li className="flex flex-col items-center">
              <Link
                href="/category/dashboard"
                className={`flex flex-col items-center justify-center hover:bg-gray-300 p-2 rounded-full ${isActive(
                  "/category/dashboard"
                )}`}
                legacyBehavior
              >
                <span className="flex flex-col items-center justify-center">
                  <FaHistory
                    className={`w-5 h-5 mb-1 ${isActive(
                      "/category/dashboard"
                    )}`}
                  />
                  <span
                    className={`text-xs ${isActive("/category/dashboard")}`}
                  >
                    Dashboard
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
                    TrainingGuide
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
