import React from "react";
import Link from "next/link";
import PrivacyPolicy from "../components/privacy/PrivacyPolicy";


const LoginPrivacyPolicyPage = () => {
  return (
    <div>
      <PrivacyPolicy />
      <div className="mb-10">
        <Link href="/account/login" className="block mb-4">
          ログインページに戻る
        </Link>
      </div>
    </div>
  );
};

export default LoginPrivacyPolicyPage;
