import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // S3는 HTTPS를 사용합니다.
        hostname: "7team-bucket-yjh.s3.ap-northeast-2.amazonaws.com", // S3 도메인 주소
        // 필요한 경우, pathname을 추가하여 특정 경로만 허용할 수 있습니다.
        // pathname: '/path/to/your/images/**',
      },
      // 필요하다면 다른 도메인도 여기에 추가할 수 있습니다.
    ],
  },
  serverExternalPackages: ["socket.io"],
};

export default nextConfig;
