/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  // 输出配置
  output: 'export',

  // 静态导出配置
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // GitHub Pages 配置
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',

  // 图片优化配置
  images: {
    unoptimized: true, // GitHub Pages 不支持 Next.js 图片优化
    domains: [
      'images.unsplash.com',
      'cdn.pixabay.com',
      'source.unsplash.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 压缩配置
  compress: true,

  // 性能优化
  swcMinify: true,

  // 实验性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // 注意：redirects 和 headers 在静态导出中不起作用
  // 如果需要这些功能，请在服务器或CDN级别配置

  // Webpack 配置
  webpack: (config) => {
    // 优化包大小
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      },
    }

    // 添加别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }

    return config
  },

  // TypeScript 配置
  typescript: {
    ignoreBuildErrors: true,
  },

  // ESLint 配置
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 构建时的静态优化
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig
