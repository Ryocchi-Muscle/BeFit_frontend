import { useEffect } from "react";

const usePreventScroll = () => {
  useEffect(() => {
    // ページマウント時にスクロールを無効化
    document.body.style.overflow = "hidden";

    // ページアンマウント時にスクロールを有効化
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
};

export default usePreventScroll;
