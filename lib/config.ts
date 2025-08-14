// 应用配置文件

import { EnvironmentConfig, ThirdPartyConfig } from '@/types/env'

// 环境配置
export const env: EnvironmentConfig = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  enableOffline: process.env.NEXT_PUBLIC_ENABLE_OFFLINE === 'true',
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,
  imageDomains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [],
}

// 第三方服务配置
export const thirdParty: ThirdPartyConfig = {
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
  social: {
    instagramToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    tiktokToken: process.env.TIKTOK_ACCESS_TOKEN,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
  },
  payment: {
    stripe: {
      publicKey: process.env.STRIPE_PUBLIC_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
    paypal: {
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    },
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY,
    },
  },
  storage: {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_S3_BUCKET,
    },
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
  },
  search: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
    },
    elasticsearch: {
      url: process.env.ELASTICSEARCH_URL,
    },
  },
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN,
  },
}

// 应用特性配置
export const features = {
  // 功能开关
  enableSearch: true,
  enableCart: true,
  enableFavorites: true,
  enableNewsletter: true,
  enableMultiLanguage: true,
  enableDarkMode: true,
  enablePWA: env.enablePWA,
  enableOffline: env.enableOffline,
  
  // 性能配置
  enableImageOptimization: true,
  enableLazyLoading: true,
  enableCodeSplitting: true,
  enableServiceWorker: env.isProduction,
  
  // 安全配置
  enableCSP: env.isProduction,
  enableHTTPS: env.isProduction,
  enableRateLimit: env.isProduction,
  
  // 开发配置
  enableDebugMode: env.isDevelopment,
  enableHotReload: env.isDevelopment,
  enableSourceMaps: env.isDevelopment,
}

// API 配置
export const api = {
  baseURL: env.apiUrl,
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}

// 缓存配置
export const cache = {
  // 静态资源缓存时间（秒）
  staticAssets: 31536000, // 1 year
  images: 31536000, // 1 year
  fonts: 31536000, // 1 year
  
  // API 缓存时间（毫秒）
  products: 5 * 60 * 1000, // 5 minutes
  menu: 30 * 60 * 1000, // 30 minutes
  news: 10 * 60 * 1000, // 10 minutes
  events: 15 * 60 * 1000, // 15 minutes
  social: 5 * 60 * 1000, // 5 minutes
  
  // 本地存储过期时间（毫秒）
  localStorage: 7 * 24 * 60 * 60 * 1000, // 7 days
  sessionStorage: 24 * 60 * 60 * 1000, // 24 hours
}

// SEO 配置
export const seo = {
  defaultTitle: 'LECO - Move Beyond Limits | Premium Sports Brand',
  titleTemplate: '%s | LECO',
  defaultDescription: 'Discover LECO\'s revolutionary sports gear. Push your limits with cutting-edge athletic footwear, apparel, and accessories designed for champions.',
  siteUrl: env.appUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.appUrl,
    siteName: 'LECO',
    images: [
      {
        url: `${env.appUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'LECO - Move Beyond Limits',
      },
    ],
  },
  twitter: {
    handle: '@leco',
    site: '@leco',
    cardType: 'summary_large_image',
  },
}

// 性能配置
export const performance = {
  // Core Web Vitals 目标值
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100,  // First Input Delay (ms)
  cls: 0.1,  // Cumulative Layout Shift
  
  // 其他性能指标
  fcp: 1800, // First Contentful Paint (ms)
  ttfb: 600, // Time to First Byte (ms)
  
  // 资源加载配置
  imageQuality: 85,
  videoQuality: 'auto',
  enableWebP: true,
  enableAVIF: false,
  
  // 预加载配置
  preloadCriticalResources: true,
  prefetchNextPage: true,
  preconnectDomains: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
}

// 国际化配置
export const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
  localeDetection: true,
  domains: [
    {
      domain: 'leco.com',
      defaultLocale: 'en',
    },
    {
      domain: 'leco.cn',
      defaultLocale: 'zh',
    },
  ],
}

// 主题配置
export const theme = {
  colors: {
    primary: '#00E5FF',
    secondary: '#8B00FF',
    accent: '#FF6B00',
    background: '#000000',
    surface: '#1A1A1A',
    text: '#FFFFFF',
  },
  fonts: {
    display: 'Orbitron',
    body: 'Inter',
    mono: 'JetBrains Mono',
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
}