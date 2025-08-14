'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    // Add mouse move listener
    window.addEventListener('mousemove', updateMousePosition)

    // Add hover listeners to interactive elements with a slight delay
    const timer = setTimeout(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-hover]')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('mousemove', updateMousePosition)
      const interactiveElements = document.querySelectorAll('a, button, [data-hover]')
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Only render on client side
  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-mode-difference hidden md:block"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovered ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className={`w-full h-full rounded-full transition-all duration-200 ${
          isHovered 
            ? 'bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple neon-glow-blue' 
            : 'bg-leco-electric-blue'
        }`} />
      </motion.div>

      {/* Trailing Effect */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998] opacity-30 hidden md:block"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-leco-electric-blue/30 to-transparent" />
      </motion.div>
    </>
  )
}

export default CustomCursor
