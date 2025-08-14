'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })

  useEffect(() => {
    // 检查浏览器是否支持 Performance Observer
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    // 监控 FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
        fcpObserver.disconnect()
      }
    })

    // 监控 LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    })

    // 监控 FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          const fid = entry.processingStart - entry.startTime
          setMetrics(prev => ({ ...prev, fid }))
        }
      })
    })

    // 监控 CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          setMetrics(prev => ({ ...prev, cls: clsValue }))
        }
      })
    })

    try {
      fcpObserver.observe({ entryTypes: ['paint'] })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      fidObserver.observe({ entryTypes: ['first-input'] })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('Performance monitoring not supported:', error)
    }

    // 获取 TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType('navigation')
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0] as PerformanceNavigationTiming
      const ttfb = navEntry.responseStart - navEntry.requestStart
      setMetrics(prev => ({ ...prev, ttfb }))
    }

    // 页面卸载时发送性能数据
    const sendMetrics = () => {
      if (process.env.NODE_ENV === 'production') {
        // 这里可以发送到分析服务
        console.log('Performance Metrics:', metrics)
      }
    }

    window.addEventListener('beforeunload', sendMetrics)

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      window.removeEventListener('beforeunload', sendMetrics)
    }
  }, [])

  // 开发环境下显示性能指标
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const getScoreColor = (metric: string, value: number | null) => {
    if (value === null) return 'text-gray-400'
    
    switch (metric) {
      case 'fcp':
      case 'lcp':
        return value <= 2500 ? 'text-green-400' : value <= 4000 ? 'text-yellow-400' : 'text-red-400'
      case 'fid':
        return value <= 100 ? 'text-green-400' : value <= 300 ? 'text-yellow-400' : 'text-red-400'
      case 'cls':
        return value <= 0.1 ? 'text-green-400' : value <= 0.25 ? 'text-yellow-400' : 'text-red-400'
      case 'ttfb':
        return value <= 800 ? 'text-green-400' : value <= 1800 ? 'text-yellow-400' : 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-sm">
      <div className="mb-2 font-bold text-leco-electric-blue">性能监控</div>
      <div className="space-y-1">
        <div className={`flex justify-between ${getScoreColor('fcp', metrics.fcp)}`}>
          <span>FCP:</span>
          <span>{metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '...'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('lcp', metrics.lcp)}`}>
          <span>LCP:</span>
          <span>{metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('fid', metrics.fid)}`}>
          <span>FID:</span>
          <span>{metrics.fid ? `${Math.round(metrics.fid)}ms` : '...'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('cls', metrics.cls)}`}>
          <span>CLS:</span>
          <span>{metrics.cls ? metrics.cls.toFixed(3) : '...'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('ttfb', metrics.ttfb)}`}>
          <span>TTFB:</span>
          <span>{metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '...'}</span>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMonitor
