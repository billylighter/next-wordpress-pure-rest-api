import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false,

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'woo-product.local',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'woo-product.local',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
