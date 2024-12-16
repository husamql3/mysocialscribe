import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      }
    }
    return config
  },
}

export default nextConfig
