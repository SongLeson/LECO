'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-leco-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated LECO Logo */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <svg 
              width="200" 
              height="80" 
              viewBox="0 0 200 80" 
              className="text-leco-electric-blue"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="50%" stopColor="#8B00FF" />
                  <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
              </defs>
              
              {/* L */}
              <motion.path
                d="M20 15 L20 65 L45 65"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* E */}
              <motion.path
                d="M55 15 L55 65 L80 65 M55 40 L75 40 M55 15 L80 15"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              
              {/* C */}
              <motion.path
                d="M115 25 A15 15 0 0 0 90 40 A15 15 0 0 0 115 55"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              />
              
              {/* O */}
              <motion.circle
                cx="140"
                cy="40"
                r="15"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h2 className="text-2xl font-display font-bold text-neon mb-2">
              MOVE BEYOND LIMITS
            </h2>
            <p className="text-leco-silver">正在加载极限体验...</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-80 h-2 bg-leco-gray rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-leco-electric-blue via-leco-plasma-purple to-leco-energy-orange rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-speed-gradient"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </motion.div>
          </div>

          {/* Progress Text */}
          <motion.div
            className="mt-4 text-leco-electric-blue font-mono text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-leco-electric-blue rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingAnimation
