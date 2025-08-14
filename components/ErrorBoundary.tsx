'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LECO App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-leco-black flex items-center justify-center">
          <motion.div
            className="text-center max-w-md mx-auto p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-6xl font-display font-black text-gradient mb-6"
              animate={{
                textShadow: [
                  '0 0 10px #00E5FF',
                  '0 0 20px #00E5FF, 0 0 30px #8B00FF',
                  '0 0 10px #00E5FF'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LECO
            </motion.div>
            <h2 className="text-xl text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-leco-silver mb-6">
              We're experiencing a technical issue. Please refresh the page to continue your LECO experience.
            </p>
            <motion.button
              className="neon-button px-8 py-4"
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>REFRESH PAGE</span>
            </motion.button>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
