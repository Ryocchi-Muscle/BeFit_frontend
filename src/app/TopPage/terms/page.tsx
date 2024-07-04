import React from "react";
import TermsOfService from "@/app/components/terms/TermsOfService";
import Link from "next/link";

const LoginTermsPage = () => {
  return (
    <div>
      <TermsOfService />
      <div className="mb-10">
        <Link href="/" className="block mb-4">
          トップページに戻る
        </Link>
      </div>
    </div>
  );
};

export default LoginTermsPage;
