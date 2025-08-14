// 媒体查询 Hook

import { useState, useEffect } from 'react'

/**
 * 媒体查询 Hook
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    
    // 设置初始值
    setMatches(media.matches)

    // 监听变化
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // 添加监听器
    if (media.addEventListener) {
      media.addEventListener('change', listener)
    } else {
      // 兼容旧版浏览器
      media.addListener(listener)
    }

    // 清理函数
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener)
      } else {
        media.removeListener(listener)
      }
    }
  }, [query])

  return matches
}

/**
 * 预定义的断点 Hooks
 */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1280px)')