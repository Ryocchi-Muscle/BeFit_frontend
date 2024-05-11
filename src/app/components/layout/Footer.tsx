import React from "react";
import { FaRegCalendar, FaHistory, FaDumbbell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Footer: React.FC<Props> = ({ children, className }) => {
  const combinedClassName = `fixed inset-x-0 bottom-0 ${className}`;
  return (
    <div className={combinedClassName}>
      <main>{children}</main>
      <footer className="bg-white text-black p-4 shadow-md  border-t border-black ">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex flex-grow justify-evenly">
            <li>
              <a href="/category/record" className="hover:underline text-black">
                <FaHistory />
              </a>
            </li>
            <li>
              <a href="/category/task" className="hover:underline text-black">
                <FaRegCalendar />
              </a>
            </li>
            <li>
              <a
                href="/category/training"
                className="hover:underline text-black"
              >
                <FaDumbbell />
              </a>
            </li>
            <li>
              <a href="/category/user_info" className="hover:underline text-black">
                <IoPerson />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
