import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/confirm/:token",
        destination: "/confirm",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
