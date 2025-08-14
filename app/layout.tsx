import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

// 开发环境下的全局错误检查（移到组件内部）
const setupErrorHandling = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (message.includes('Objects are not valid as a React child')) {
        console.group('🚨 React Render Error Detected')
        console.error('Error:', ...args)
        console.trace('Stack trace:')
        console.groupEnd()
      }
      originalConsoleError.apply(console, args)
    }
  }
}

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'LECO Sports - Move Beyond Limits | 突破极限的高端运动品牌',
  description: 'LECO是专注于高性能运动装备的高端品牌，致力于为运动员提供突破极限的专业装备。探索我们的跑鞋、运动服装、智能装备等产品系列。',
  keywords: ['LECO', '运动品牌', '高端运动装备', '跑鞋', '运动服装', '智能装备', '专业运动', '突破极限', 'sports', 'athletic wear', 'footwear', 'performance'],
  authors: [{ name: 'LECO Sports Team' }],
  creator: 'LECO Sports',
  publisher: 'LECO Sports',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://leco-sports.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://leco-sports.com',
    title: 'LECO Sports - Move Beyond Limits | 突破极限的高端运动品牌',
    description: 'LECO是专注于高性能运动装备的高端品牌，致力于为运动员提供突破极限的专业装备。',
    siteName: 'LECO Sports',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LECO Sports - Move Beyond Limits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LECO Sports - Move Beyond Limits',
    description: 'LECO是专注于高性能运动装备的高端品牌，致力于为运动员提供突破极限的专业装备。',
    images: ['/images/twitter-image.jpg'],
    creator: '@LECOSports',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00E5FF',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00E5FF' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // 设置错误处理
  setupErrorHandling()

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} font-body bg-leco-black text-white antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
