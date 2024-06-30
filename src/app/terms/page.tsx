import React from "react";
import TermsOfService from "../components/terms/TermsOfService";
import Link from "next/link";

const LoginTermsPage = () => {
  return (
    <div>
      <TermsOfService />
      <div className="mb-10">
        <Link href="/account/login" className="block mb-4">
          ログインページに戻る
        </Link>
      </div>
    </div>
  );
};

export default LoginTermsPage;
