/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  images: {
    domains: [
      "44.203.190.167",
      "zipple.co.kr",
      "k.kakaocdn.net",
      "img1.kakaocdn.net",
      "t1.kakaocdn.net",
    ], // 허용할 이미지 도메인 (추후 삭제 필요)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "44.203.190.167",
        port: "8081",
        pathname: "/zipple/home/ubuntu/zipple/logo/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${API_URL}/api/v1/:path*`,
      },
      {
        source: "/api/auth/:path*",
        destination: `${API_URL}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
