/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // X(Twitter)とGoogleのプロフィール画像を表示するために追加
    domains: ["lh3.googleusercontent.com", "via.placeholder.com"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "localhost",
      port: "3000",
      pathname: "/images/**",
    },
  ],
  productionBrowserSourceMaps: true, 
};

export default nextConfig;
