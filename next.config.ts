import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/law-3-ppt",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
