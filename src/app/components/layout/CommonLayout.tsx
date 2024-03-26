import React from "react";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const CommonLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
