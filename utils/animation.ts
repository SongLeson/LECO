// 动画工具函数

import { ANIMATION_DURATION } from '@/lib/constants'

/**
 * 缓动函数
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInElastic: (t: number) => (0.04 - 0.04 / t) * Math.sin(25 * t) + 1,
  easeOutElastic: (t: number) => 0.04 * t / (--t) * Math.sin(25 * t),
  easeInOutElastic: (t: number) => (t -= 0.5) < 0 ? (0.02 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1,
}

/**
 * 动画帧函数
 */
export const animate = (
  callback: (progress: number) => void,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.easeOutQuad
): Promise<void> => {
  return new Promise((resolve) => {
    const startTime = performance.now()

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easing(progress)

      callback(easedProgress)

      if (progress < 1) {
        requestAnimationFrame(frame)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(frame)
  })
}

/**
 * 延迟函数
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 创建交错动画
 */
export const staggerAnimation = async (
  elements: Element[],
  animationFn: (element: Element, index: number) => Promise<void>,
  staggerDelay: number = 100
): Promise<void> => {
  const promises = elements.map((element, index) => 
    delay(index * staggerDelay).then(() => animationFn(element, index))
  )
  
  await Promise.all(promises)
}

/**
 * 淡入动画
 */
export const fadeIn = (
  element: HTMLElement,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.easeOutQuad
): Promise<void> => {
  element.style.opacity = '0'
  element.style.display = 'block'

  return animate((progress) => {
    element.style.opacity = progress.toString()
  }, duration, easing)
}

/**
 * 淡出动画
 */
export const fadeOut = (
  element: HTMLElement,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.easeOutQuad
): Promise<void> => {
  return animate((progress) => {
    element.style.opacity = (1 - progress).toString()
  }, duration, easing).then(() => {
    element.style.display = 'none'
  })
}

/**
 * 滑入动画
 */
export const slideIn = (
  element: HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.easeOutQuad
): Promise<void> => {
  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }

  element.style.transform = transforms[direction]
  element.style.opacity = '0'

  return animate((progress) => {
    const currentDistance = distance * (1 - progress)
    const currentTransforms = {
      up: `translateY(${currentDistance}px)`,
      down: `translateY(-${currentDistance}px)`,
      left: `translateX(${currentDistance}px)`,
      right: `translateX(-${currentDistance}px)`,
    }

    element.style.transform = currentTransforms[direction]
    element.style.opacity = progress.toString()
  }, duration, easing)
}

/**
 * 缩放动画
 */
export const scale = (
  element: HTMLElement,
  fromScale: number = 0,
  toScale: number = 1,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.easeOutQuad
): Promise<void> => {
  element.style.transform = `scale(${fromScale})`
  element.style.opacity = '0'

  return animate((progress) => {
    const currentScale = fromScale + (toScale - fromScale) * progress
    element.style.transform = `scale(${currentScale})`
    element.style.opacity = progress.toString()
  }, duration, easing)
}

/**
 * 旋转动画
 */
export const rotate = (
  element: HTMLElement,
  fromAngle: number = 0,
  toAngle: number = 360,
  duration: number = ANIMATION_DURATION.NORMAL,
  easing: (t: number) => number = easingFunctions.linear
): Promise<void> => {
  return animate((progress) => {
    const currentAngle = fromAngle + (toAngle - fromAngle) * progress
    element.style.transform = `rotate(${currentAngle}deg)`
  }, duration, easing)
}

/**
 * 波纹效果
 */
export const createRippleEffect = (
  element: HTMLElement,
  event: MouseEvent,
  color: string = 'rgba(255, 255, 255, 0.3)'
): Promise<void> => {
  return new Promise((resolve) => {
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: ${color};
      transform: scale(0);
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 1000;
    `

    element.style.position = 'relative'
    element.style.overflow = 'hidden'
    element.appendChild(ripple)

    animate((progress) => {
      ripple.style.transform = `scale(${progress})`
      ripple.style.opacity = (1 - progress).toString()
    }, 600, easingFunctions.easeOutQuad).then(() => {
      ripple.remove()
      resolve()
    })
  })
}

/**
 * 打字机效果
 */
export const typewriterEffect = (
  element: HTMLElement,
  text: string,
  speed: number = 50
): Promise<void> => {
  return new Promise((resolve) => {
    element.textContent = ''
    let index = 0

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index)
        index++
        setTimeout(type, speed)
      } else {
        resolve()
      }
    }

    type()
  })
}

/**
 * 数字计数动画
 */
export const animateNumber = (
  element: HTMLElement,
  from: number,
  to: number,
  duration: number = ANIMATION_DURATION.SLOW,
  formatter?: (value: number) => string
): Promise<void> => {
  return animate((progress) => {
    const currentValue = from + (to - from) * progress
    const displayValue = formatter ? formatter(currentValue) : Math.round(currentValue).toString()
    element.textContent = displayValue
  }, duration, easingFunctions.easeOutQuad)
}

/**
 * 视差滚动动画
 */
export const createParallaxAnimation = (
  element: HTMLElement,
  speed: number = 0.5
) => {
  const updateParallax = () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -speed
    element.style.transform = `translateY(${rate}px)`
  }

  window.addEventListener('scroll', updateParallax, { passive: true })
  updateParallax() // 初始调用

  return () => {
    window.removeEventListener('scroll', updateParallax)
  }
}

/**
 * 磁性效果（鼠标跟随）
 */
export const createMagneticEffect = (
  element: HTMLElement,
  strength: number = 0.3
) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    element.style.transform = 'translate(0px, 0px)'
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

/**
 * 创建粒子动画
 */
export const createParticleAnimation = (
  container: HTMLElement,
  particleCount: number = 50,
  particleColor: string = '#00E5FF'
) => {
  const particles: HTMLElement[] = []

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: ${particleColor};
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
    `
    
    container.appendChild(particle)
    particles.push(particle)
  }

  const animateParticles = () => {
    particles.forEach((particle, index) => {
      const delay = index * 100
      const duration = 2000 + Math.random() * 2000
      
      setTimeout(() => {
        const startX = Math.random() * container.offsetWidth
        const startY = container.offsetHeight
        const endX = startX + (Math.random() - 0.5) * 200
        const endY = -50
        
        particle.style.left = startX + 'px'
        particle.style.top = startY + 'px'
        particle.style.opacity = '1'
        
        animate((progress) => {
          const currentX = startX + (endX - startX) * progress
          const currentY = startY + (endY - startY) * progress
          const opacity = 1 - progress
          
          particle.style.left = currentX + 'px'
          particle.style.top = currentY + 'px'
          particle.style.opacity = opacity.toString()
        }, duration, easingFunctions.easeOutQuad)
      }, delay)
    })
  }

  // 开始动画
  animateParticles()
  const intervalId = setInterval(animateParticles, 3000)

  return () => {
    clearInterval(intervalId)
    particles.forEach(particle => particle.remove())
  }
}