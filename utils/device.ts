// 设备检测工具函数

import { BREAKPOINTS, DEVICE_TYPES } from '@/lib/constants'

/**
 * 检测设备类型
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  
  if (width < BREAKPOINTS.MD) {
    return 'mobile'
  } else if (width < BREAKPOINTS.LG) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

/**
 * 检测是否为移动设备
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < BREAKPOINTS.MD
}

/**
 * 检测是否为平板设备
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const width = window.innerWidth
  return width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG
}

/**
 * 检测是否为桌面设备
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return true
  
  return window.innerWidth >= BREAKPOINTS.LG
}

/**
 * 检测是否为触摸设备
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * 检测浏览器类型
 */
export const getBrowserInfo = (): {
  name: string
  version: string
  isChrome: boolean
  isFirefox: boolean
  isSafari: boolean
  isEdge: boolean
  isIE: boolean
} => {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      version: '0',
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false,
      isIE: false,
    }
  }
  
  const userAgent = navigator.userAgent
  
  let name = 'unknown'
  let version = '0'
  
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome'
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || '0'
  } else if (userAgent.includes('Firefox')) {
    name = 'Firefox'
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || '0'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari'
    version = userAgent.match(/Version\/(\d+)/)?.[1] || '0'
  } else if (userAgent.includes('Edg')) {
    name = 'Edge'
    version = userAgent.match(/Edg\/(\d+)/)?.[1] || '0'
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    name = 'IE'
    version = userAgent.match(/(?:MSIE |rv:)(\d+)/)?.[1] || '0'
  }
  
  return {
    name,
    version,
    isChrome: name === 'Chrome',
    isFirefox: name === 'Firefox',
    isSafari: name === 'Safari',
    isEdge: name === 'Edge',
    isIE: name === 'IE',
  }
}

/**
 * 检测操作系统
 */
export const getOperatingSystem = (): {
  name: string
  isWindows: boolean
  isMacOS: boolean
  isLinux: boolean
  isAndroid: boolean
  isIOS: boolean
} => {
  if (typeof window === 'undefined') {
    return {
      name: 'unknown',
      isWindows: false,
      isMacOS: false,
      isLinux: false,
      isAndroid: false,
      isIOS: false,
    }
  }
  
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  
  let name = 'unknown'
  
  if (userAgent.includes('Windows')) {
    name = 'Windows'
  } else if (userAgent.includes('Mac') || platform.includes('Mac')) {
    name = 'macOS'
  } else if (userAgent.includes('Linux')) {
    name = 'Linux'
  } else if (userAgent.includes('Android')) {
    name = 'Android'
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    name = 'iOS'
  }
  
  return {
    name,
    isWindows: name === 'Windows',
    isMacOS: name === 'macOS',
    isLinux: name === 'Linux',
    isAndroid: name === 'Android',
    isIOS: name === 'iOS',
  }
}

/**
 * 检测网络连接状态
 */
export const getNetworkInfo = (): {
  isOnline: boolean
  connectionType?: string
  effectiveType?: string
  downlink?: number
  rtt?: number
} => {
  if (typeof navigator === 'undefined') {
    return { isOnline: true }
  }
  
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection
  
  return {
    isOnline: navigator.onLine,
    connectionType: connection?.type,
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
  }
}

/**
 * 检测设备内存
 */
export const getDeviceMemory = (): number => {
  if (typeof navigator === 'undefined') return 0
  
  return (navigator as any).deviceMemory || 0
}

/**
 * 检测 CPU 核心数
 */
export const getCPUCores = (): number => {
  if (typeof navigator === 'undefined') return 0
  
  return navigator.hardwareConcurrency || 0
}

/**
 * 检测屏幕信息
 */
export const getScreenInfo = (): {
  width: number
  height: number
  availWidth: number
  availHeight: number
  pixelRatio: number
  colorDepth: number
  orientation?: string
} => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      availWidth: 0,
      availHeight: 0,
      pixelRatio: 1,
      colorDepth: 24,
    }
  }
  
  const screen = window.screen
  
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: screen.colorDepth,
    orientation: (screen as any).orientation?.type,
  }
}

/**
 * 检测视口信息
 */
export const getViewportInfo = (): {
  width: number
  height: number
  scrollX: number
  scrollY: number
} => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, scrollX: 0, scrollY: 0 }
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX || window.pageXOffset,
    scrollY: window.scrollY || window.pageYOffset,
  }
}

/**
 * 检测是否支持 WebP
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }
    
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * 检测是否支持 AVIF
 */
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }
    
    const avif = new Image()
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2)
    }
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
  })
}

/**
 * 检测是否支持特定功能
 */
export const checkFeatureSupport = () => {
  if (typeof window === 'undefined') {
    return {
      webGL: false,
      webGL2: false,
      webAssembly: false,
      serviceWorker: false,
      pushNotifications: false,
      geolocation: false,
      localStorage: false,
      sessionStorage: false,
      indexedDB: false,
      webRTC: false,
    }
  }
  
  return {
    webGL: !!window.WebGLRenderingContext,
    webGL2: !!window.WebGL2RenderingContext,
    webAssembly: typeof WebAssembly === 'object',
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    geolocation: 'geolocation' in navigator,
    localStorage: 'localStorage' in window,
    sessionStorage: 'sessionStorage' in window,
    indexedDB: 'indexedDB' in window,
    webRTC: 'RTCPeerConnection' in window,
  }
}

/**
 * 获取设备指纹（简单版本）
 */
export const getDeviceFingerprint = (): string => {
  if (typeof window === 'undefined') return 'server'
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Device fingerprint', 2, 2)
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory,
  ].join('|')
  
  // 简单哈希
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  
  return Math.abs(hash).toString(36)
}