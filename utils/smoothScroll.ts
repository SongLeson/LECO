// 平滑滚动工具函数

/**
 * 初始化 Lenis 平滑滚动
 */
export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null

  // 动态导入 Lenis
  import('lenis').then(({ default: Lenis }) => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // 动画循环
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 将 lenis 实例挂载到 window 对象上，方便其他地方使用
    ;(window as any).lenis = lenis

    return lenis
  }).catch(error => {
    console.error('Failed to initialize smooth scroll:', error)
  })
}

/**
 * 滚动到指定元素
 */
export const scrollToElement = (
  selector: string | Element,
  options: {
    offset?: number
    duration?: number
    easing?: (t: number) => number
  } = {}
) => {
  const { offset = 0, duration = 1000 } = options

  let element: Element | null = null

  if (typeof selector === 'string') {
    element = document.querySelector(selector)
  } else {
    element = selector
  }

  if (!element) {
    console.warn(`Element not found: ${selector}`)
    return
  }

  const lenis = (window as any).lenis

  if (lenis) {
    // 使用 Lenis 滚动
    lenis.scrollTo(element, {
      offset,
      duration: duration / 1000, // Lenis 使用秒为单位
    })
  } else {
    // 回退到原生滚动
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = elementTop + offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * 滚动到页面顶部
 */
export const scrollToTop = (duration: number = 1000) => {
  const lenis = (window as any).lenis

  if (lenis) {
    lenis.scrollTo(0, { duration: duration / 1000 })
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

/**
 * 滚动到页面底部
 */
export const scrollToBottom = (duration: number = 1000) => {
  const lenis = (window as any).lenis

  if (lenis) {
    lenis.scrollTo(document.body.scrollHeight, { duration: duration / 1000 })
  } else {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    })
  }
}

/**
 * 获取滚动进度（0-1）
 */
export const getScrollProgress = (): number => {
  if (typeof window === 'undefined') return 0

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

  return scrollHeight > 0 ? scrollTop / scrollHeight : 0
}

/**
 * 检查元素是否在视口中
 */
export const isElementInViewport = (
  element: Element,
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight

  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold
  )
}

/**
 * 获取元素相对于视口的位置信息
 */
export const getElementViewportPosition = (element: Element) => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
    isVisible: rect.bottom > 0 && rect.top < windowHeight,
    isFullyVisible: rect.top >= 0 && rect.bottom <= windowHeight,
    visibilityRatio: Math.max(0, Math.min(1, 
      (Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)) / rect.height
    )),
    distanceFromCenter: Math.abs((rect.top + rect.height / 2) - windowHeight / 2),
  }
}

/**
 * 创建视差滚动效果
 */
export const createParallaxEffect = (
  element: Element,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const updateParallax = () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -speed

    if (direction === 'vertical') {
      ;(element as HTMLElement).style.transform = `translateY(${rate}px)`
    } else {
      ;(element as HTMLElement).style.transform = `translateX(${rate}px)`
    }
  }

  // 初始更新
  updateParallax()

  // 监听滚动事件
  const handleScroll = () => {
    requestAnimationFrame(updateParallax)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // 返回清理函数
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * 创建滚动触发动画
 */
export const createScrollTrigger = (
  element: Element,
  callback: (progress: number, isVisible: boolean) => void,
  threshold: number = 0.1
) => {
  const handleScroll = () => {
    const position = getElementViewportPosition(element)
    const isVisible = position.visibilityRatio > threshold

    callback(position.visibilityRatio, isVisible)
  }

  // 初始检查
  handleScroll()

  // 监听滚动事件
  window.addEventListener('scroll', handleScroll, { passive: true })

  // 返回清理函数
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

/**
 * 禁用/启用滚动
 */
export const toggleScroll = (disable: boolean) => {
  const lenis = (window as any).lenis

  if (lenis) {
    if (disable) {
      lenis.stop()
    } else {
      lenis.start()
    }
  } else {
    // 回退到 CSS 方法
    if (disable) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

/**
 * 获取当前滚动位置
 */
export const getScrollPosition = (): { x: number; y: number } => {
  if (typeof window === 'undefined') return { x: 0, y: 0 }

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * 设置滚动位置
 */
export const setScrollPosition = (x: number, y: number, smooth: boolean = false) => {
  if (typeof window === 'undefined') return

  const lenis = (window as any).lenis

  if (lenis && smooth) {
    lenis.scrollTo(y)
  } else {
    window.scrollTo({
      left: x,
      top: y,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }
}

/**
 * 监听滚动方向
 */
export const createScrollDirectionListener = (
  callback: (direction: 'up' | 'down' | 'none') => void
) => {
  let lastScrollY = window.pageYOffset
  let ticking = false

  const updateScrollDirection = () => {
    const scrollY = window.pageYOffset
    const direction = scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : 'none'
    
    if (direction !== 'none') {
      callback(direction)
    }
    
    lastScrollY = scrollY
    ticking = false
  }

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection)
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}