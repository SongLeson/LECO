'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true) // 默认深色模式
  const [mounted, setMounted] = useState(false)

  // 确保组件已挂载，避免服务端渲染不一致
  useEffect(() => {
    setMounted(true)

    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      const isDarkTheme = savedTheme === 'dark'
      setIsDark(isDarkTheme)
      document.documentElement.classList.toggle('dark', isDarkTheme)
    } else {
      // 如果没有保存的主题，默认使用深色模式
      setIsDark(true)
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }

    // 监听系统主题变化（仅在没有用户设置时）
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(true) // 保持默认深色模式
        document.documentElement.classList.add('dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    // 更新DOM类名
    document.documentElement.classList.toggle('dark', newTheme)
    
    // 保存到本地存储
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    // 触发自定义事件，通知其他组件主题变化
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme: newTheme ? 'dark' : 'light' } 
    }))
  }

  // 避免服务端渲染不一致
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-leco-gray animate-pulse" />
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark 
          ? 'bg-leco-electric-blue text-leco-black hover:bg-leco-neon-blue' 
          : 'bg-leco-gray text-leco-electric-blue hover:bg-leco-carbon border border-leco-carbon'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Sun size={20} className="text-current" />
        ) : (
          <Moon size={20} className="text-current" />
        )}
      </motion.div>
      
      {/* 发光效果 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark 
            ? '0 0 20px rgba(0, 229, 255, 0.3)' 
            : '0 0 20px rgba(139, 0, 255, 0.2)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

export default ThemeToggle
