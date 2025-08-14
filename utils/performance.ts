// 性能监控工具函数

import { PerformanceMetrics } from '@/types'

/**
 * 获取 Core Web Vitals 指标
 */
export const getCoreWebVitals = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {}
    
    // LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      metrics.lcp = lastEntry.startTime
      lcpObserver.disconnect()
      
      checkComplete()
    })
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      metrics.lcp = 0
      checkComplete()
    }
    
    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstEntry = entries[0] as any
      metrics.fid = firstEntry.processingStart - firstEntry.startTime
      fidObserver.disconnect()
      
      checkComplete()
    })
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      metrics.fid = 0
      checkComplete()
    }
    
    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      metrics.cls = clsValue
    })
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      metrics.cls = 0
    }
    
    // FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstEntry = entries[0] as any
      metrics.fcp = firstEntry.startTime
      fcpObserver.disconnect()
      
      checkComplete()
    })
    
    try {
      fcpObserver.observe({ entryTypes: ['paint'] })
    } catch (e) {
      metrics.fcp = 0
      checkComplete()
    }
    
    // TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType('navigation') as any[]
    if (navigationEntries.length > 0) {
      metrics.ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart
    } else {
      metrics.ttfb = 0
    }
    
    let completedMetrics = 0
    const totalMetrics = 4 // LCP, FID, FCP, TTFB (CLS is continuous)
    
    function checkComplete() {
      completedMetrics++
      if (completedMetrics >= totalMetrics) {
        // 等待一段时间收集 CLS 数据
        setTimeout(() => {
          clsObserver.disconnect()
          resolve(metrics as PerformanceMetrics)
        }, 1000)
      }
    }
    
    // 超时保护
    setTimeout(() => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      fcpObserver.disconnect()
      clsObserver.disconnect()
      
      resolve({
        lcp: metrics.lcp || 0,
        fid: metrics.fid || 0,
        cls: metrics.cls || 0,
        fcp: metrics.fcp || 0,
        ttfb: metrics.ttfb || 0,
      })
    }, 5000)
  })
}

/**
 * 监控资源加载性能
 */
export const monitorResourcePerformance = () => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    
    entries.forEach((entry) => {
      const resource = entry as PerformanceResourceTiming
      
      // 分析慢加载资源
      if (resource.duration > 1000) {
        console.warn('Slow resource detected:', {
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize,
          type: resource.initiatorType,
        })
      }
      
      // 分析大文件
      if (resource.transferSize > 1024 * 1024) { // 1MB
        console.warn('Large resource detected:', {
          name: resource.name,
          size: resource.transferSize,
          duration: resource.duration,
        })
      }
    })
  })
  
  try {
    observer.observe({ entryTypes: ['resource'] })
  } catch (e) {
    console.error('Resource performance monitoring not supported')
  }
  
  return () => observer.disconnect()
}

/**
 * 监控长任务
 */
export const monitorLongTasks = () => {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    
    entries.forEach((entry) => {
      console.warn('Long task detected:', {
        duration: entry.duration,
        startTime: entry.startTime,
        name: entry.name,
      })
    })
  })
  
  try {
    observer.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    console.error('Long task monitoring not supported')
  }
  
  return () => observer.disconnect()
}

/**
 * 测量函数执行时间
 */
export const measureFunction = <T extends (...args: any[]) => any>(
  fn: T,
  name?: string
): T => {
  return ((...args: Parameters<T>) => {
    const startTime = performance.now()
    const result = fn(...args)
    const endTime = performance.now()
    
    console.log(`${name || fn.name} execution time: ${endTime - startTime}ms`)
    
    return result
  }) as T
}

/**
 * 测量异步函数执行时间
 */
export const measureAsyncFunction = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  name?: string
): T => {
  return (async (...args: Parameters<T>) => {
    const startTime = performance.now()
    const result = await fn(...args)
    const endTime = performance.now()
    
    console.log(`${name || fn.name} execution time: ${endTime - startTime}ms`)
    
    return result
  }) as T
}

/**
 * 创建性能标记
 */
export const createPerformanceMark = (name: string) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name)
  }
}

/**
 * 测量两个标记之间的时间
 */
export const measureBetweenMarks = (
  startMark: string,
  endMark: string,
  measureName?: string
): number => {
  if (typeof performance === 'undefined' || !performance.measure) {
    return 0
  }
  
  try {
    const name = measureName || `${startMark}-to-${endMark}`
    performance.measure(name, startMark, endMark)
    
    const measures = performance.getEntriesByName(name, 'measure')
    return measures.length > 0 ? measures[0].duration : 0
  } catch (e) {
    console.error('Performance measurement failed:', e)
    return 0
  }
}

/**
 * 获取内存使用情况
 */
export const getMemoryUsage = (): {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
} => {
  const memory = (performance as any).memory
  
  if (!memory) {
    return {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0,
    }
  }
  
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
  }
}

/**
 * 监控内存泄漏
 */
export const monitorMemoryLeaks = (interval: number = 10000) => {
  let previousMemory = getMemoryUsage()
  
  const intervalId = setInterval(() => {
    const currentMemory = getMemoryUsage()
    const memoryIncrease = currentMemory.usedJSHeapSize - previousMemory.usedJSHeapSize
    
    if (memoryIncrease > 1024 * 1024) { // 1MB increase
      console.warn('Potential memory leak detected:', {
        increase: memoryIncrease,
        current: currentMemory.usedJSHeapSize,
        previous: previousMemory.usedJSHeapSize,
      })
    }
    
    previousMemory = currentMemory
  }, interval)
  
  return () => clearInterval(intervalId)
}

/**
 * 获取页面加载时间
 */
export const getPageLoadTime = (): {
  domContentLoaded: number
  loadComplete: number
  firstPaint: number
  firstContentfulPaint: number
} => {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paintEntries = performance.getEntriesByType('paint')
  
  const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')
  const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')
  
  return {
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.navigationStart : 0,
    loadComplete: navigation ? navigation.loadEventEnd - navigation.navigationStart : 0,
    firstPaint: firstPaint ? firstPaint.startTime : 0,
    firstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : 0,
  }
}

/**
 * 性能预算检查
 */
export const checkPerformanceBudget = (
  metrics: PerformanceMetrics,
  budget: {
    lcp?: number
    fid?: number
    cls?: number
    fcp?: number
    ttfb?: number
  }
): {
  passed: boolean
  violations: string[]
} => {
  const violations: string[] = []
  
  if (budget.lcp && metrics.lcp > budget.lcp) {
    violations.push(`LCP exceeded budget: ${metrics.lcp}ms > ${budget.lcp}ms`)
  }
  
  if (budget.fid && metrics.fid > budget.fid) {
    violations.push(`FID exceeded budget: ${metrics.fid}ms > ${budget.fid}ms`)
  }
  
  if (budget.cls && metrics.cls > budget.cls) {
    violations.push(`CLS exceeded budget: ${metrics.cls} > ${budget.cls}`)
  }
  
  if (budget.fcp && metrics.fcp > budget.fcp) {
    violations.push(`FCP exceeded budget: ${metrics.fcp}ms > ${budget.fcp}ms`)
  }
  
  if (budget.ttfb && metrics.ttfb > budget.ttfb) {
    violations.push(`TTFB exceeded budget: ${metrics.ttfb}ms > ${budget.ttfb}ms`)
  }
  
  return {
    passed: violations.length === 0,
    violations,
  }
}

/**
 * 自动性能监控
 */
export const startPerformanceMonitoring = () => {
  // 监控 Core Web Vitals
  getCoreWebVitals().then((metrics) => {
    console.log('Core Web Vitals:', metrics)
    
    // 检查性能预算
    const budgetCheck = checkPerformanceBudget(metrics, {
      lcp: 2500,
      fid: 100,
      cls: 0.1,
      fcp: 1800,
      ttfb: 600,
    })
    
    if (!budgetCheck.passed) {
      console.warn('Performance budget violations:', budgetCheck.violations)
    }
  })
  
  // 监控资源性能
  const stopResourceMonitoring = monitorResourcePerformance()
  
  // 监控长任务
  const stopLongTaskMonitoring = monitorLongTasks()
  
  // 监控内存泄漏
  const stopMemoryMonitoring = monitorMemoryLeaks()
  
  // 返回清理函数
  return () => {
    stopResourceMonitoring()
    stopLongTaskMonitoring()
    stopMemoryMonitoring()
  }
}