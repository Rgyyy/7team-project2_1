import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // ESLint와 TypeScript 에러 무시 설정 추가
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "7team-bucket-yjh.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  serverExternalPackages: ["socket.io"],

  // 프로덕션 환경 최적화
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
