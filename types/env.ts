// 环境变量类型定义

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Next.js 环境变量
      NODE_ENV: 'development' | 'production' | 'test'
      NEXT_PUBLIC_APP_URL: string
      NEXT_PUBLIC_API_URL: string
      
      // 数据库配置
      DATABASE_URL: string
      REDIS_URL?: string
      
      // 认证相关
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      JWT_SECRET: string
      
      // 第三方服务 API Keys
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string
      NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID?: string
      NEXT_PUBLIC_FACEBOOK_PIXEL_ID?: string
      
      // 社交媒体 API
      INSTAGRAM_ACCESS_TOKEN?: string
      TIKTOK_ACCESS_TOKEN?: string
      YOUTUBE_API_KEY?: string
      
      // 支付服务
      STRIPE_PUBLIC_KEY?: string
      STRIPE_SECRET_KEY?: string
      PAYPAL_CLIENT_ID?: string
      PAYPAL_CLIENT_SECRET?: string
      
      // 邮件服务
      SMTP_HOST?: string
      SMTP_PORT?: string
      SMTP_USER?: string
      SMTP_PASS?: string
      SENDGRID_API_KEY?: string
      
      // 文件存储
      AWS_ACCESS_KEY_ID?: string
      AWS_SECRET_ACCESS_KEY?: string
      AWS_REGION?: string
      AWS_S3_BUCKET?: string
      CLOUDINARY_CLOUD_NAME?: string
      CLOUDINARY_API_KEY?: string
      CLOUDINARY_API_SECRET?: string
      
      // 搜索服务
      ALGOLIA_APP_ID?: string
      ALGOLIA_API_KEY?: string
      ELASTICSEARCH_URL?: string
      
      // 监控和日志
      SENTRY_DSN?: string
      VERCEL_URL?: string
      
      // 功能开关
      NEXT_PUBLIC_ENABLE_ANALYTICS?: string
      NEXT_PUBLIC_ENABLE_CHAT?: string
      NEXT_PUBLIC_ENABLE_PWA?: string
      NEXT_PUBLIC_ENABLE_OFFLINE?: string
      
      // 性能配置
      NEXT_PUBLIC_CDN_URL?: string
      NEXT_PUBLIC_IMAGE_DOMAINS?: string
      
      // 开发环境配置
      NEXT_PUBLIC_DEV_MODE?: string
      NEXT_PUBLIC_DEBUG?: string
    }
  }
}

// 环境配置类型
export interface EnvironmentConfig {
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  appUrl: string
  apiUrl: string
  enableAnalytics: boolean
  enableChat: boolean
  enablePWA: boolean
  enableOffline: boolean
  cdnUrl?: string
  imageDomains: string[]
}

// 第三方服务配置类型
export interface ThirdPartyConfig {
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
    facebookPixelId?: string
  }
  social?: {
    instagramToken?: string
    tiktokToken?: string
    youtubeApiKey?: string
  }
  payment?: {
    stripe?: {
      publicKey?: string
      secretKey?: string
    }
    paypal?: {
      clientId?: string
      clientSecret?: string
    }
  }
  email?: {
    smtp?: {
      host?: string
      port?: number
      user?: string
      pass?: string
    }
    sendgrid?: {
      apiKey?: string
    }
  }
  storage?: {
    aws?: {
      accessKeyId?: string
      secretAccessKey?: string
      region?: string
      bucket?: string
    }
    cloudinary?: {
      cloudName?: string
      apiKey?: string
      apiSecret?: string
    }
  }
  search?: {
    algolia?: {
      appId?: string
      apiKey?: string
    }
    elasticsearch?: {
      url?: string
    }
  }
  monitoring?: {
    sentryDsn?: string
  }
}

export {}