'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ProductShowcase from '@/components/ProductShowcase'
import BrandPhilosophy from '@/components/BrandPhilosophy'
import SportsCinema from '@/components/SportsCinema'
import EventsSection from '@/components/EventsSection'
import NewsSection from '@/components/NewsSection'
import SubscribeSection from '@/components/SubscribeSection'
import SocialHub from '@/components/SocialHub'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/StructuredData'
import LoadingAnimation from '@/components/LoadingAnimation'
import CustomCursor from '@/components/CustomCursor'
import ErrorBoundary from '@/components/ErrorBoundary'
import { initSmoothScroll } from '@/utils/smoothScroll'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Initialize smooth scroll
    const timer = setTimeout(() => {
      initSmoothScroll()
    }, 100)
    
    // Preload critical resources safely
    if (typeof window !== 'undefined') {
      const preloadVideo = document.createElement('link')
      preloadVideo.rel = 'preload'
      preloadVideo.as = 'video'
      preloadVideo.href = '/videos/hero-bg.mp4'
      document.head.appendChild(preloadVideo)
    }

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-leco-black flex items-center justify-center">
        <div className="text-leco-electric-blue text-2xl font-display">LECO</div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <LoadingAnimation />
      <CustomCursor />
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <main className="min-h-screen bg-leco-black">
        <Navigation />
        <HeroSection />
        <ProductShowcase />
        <BrandPhilosophy />
        <SportsCinema />
        <EventsSection />
        <NewsSection />
        <SubscribeSection />
        <SocialHub />
        <Footer />
      </main>
      <ScrollToTop />
    </ErrorBoundary>
  )
}
