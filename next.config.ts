import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
  
    allowedDevOrigins: ['192.168.31.227:3000'],
  } as any, 
};

export default nextConfig;