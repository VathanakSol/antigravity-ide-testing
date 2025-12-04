import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  // Empty turbopack config to silence the warning
  // Turbopack handles WASM automatically
  turbopack: {},
};

export default nextConfig;
