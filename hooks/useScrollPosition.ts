// 滚动位置监听 Hook

import { useState, useEffect } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

/**
 * 监听滚动位置的 Hook
 */
export default function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition({
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
      })
    }

    // 初始位置
    updatePosition()

    // 监听滚动事件
    window.addEventListener('scroll', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePosition)
    }
  }, [])

  return scrollPosition
}

/**
 * 监听滚动方向的 Hook
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollDirection)
    }
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}