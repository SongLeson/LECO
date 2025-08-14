'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // 计算滚动进度
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrollProgress(progress)
      setIsVisible(scrollTop > 300) // 滚动超过300px时显示
    }

    const throttledToggleVisibility = throttle(toggleVisibility, 100)

    window.addEventListener('scroll', throttledToggleVisibility)
    return () => window.removeEventListener('scroll', throttledToggleVisibility)
  }, [])

  // 节流函数
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
        >
          <motion.button
            onClick={scrollToTop}
            className="relative w-14 h-14 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple rounded-full flex items-center justify-center text-leco-black shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)"
            }}
            whileTap={{ scale: 0.9 }}
            title="返回顶部"
            aria-label="返回顶部"
          >
            {/* 进度环 */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90" 
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={163.36} // 2 * π * 26
                strokeDashoffset={163.36 - (163.36 * scrollProgress) / 100}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* 箭头图标 */}
            <motion.div
              animate={{ 
                y: [0, -2, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <ArrowUp size={24} className="text-white relative z-10" />
            </motion.div>

            {/* 悬浮光效 */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple opacity-0 group-hover:opacity-20"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.button>

          {/* 进度百分比显示 */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-leco-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0, y: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
