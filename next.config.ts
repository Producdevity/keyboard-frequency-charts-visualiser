import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.log': {
        loaders: ['raw-loader'],
        as: '.js',
      },
    },
  },
}

export default nextConfig
