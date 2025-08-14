import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'LECO - Move Beyond Limits | Premium Sports Brand',
  description: 'Discover LECO\'s revolutionary sports gear. Push your limits with cutting-edge athletic footwear, apparel, and accessories designed for champions.',
  keywords: ['sports', 'athletic wear', 'footwear', 'performance', 'LECO', 'sportswear'],
  authors: [{ name: 'LECO Sports' }],
  openGraph: {
    title: 'LECO - Move Beyond Limits',
    description: 'Revolutionary sports gear for champions',
    type: 'website',
    locale: 'en_US',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00D4FF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
