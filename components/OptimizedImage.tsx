'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/images/placeholder.jpg',
  priority = false,
  quality = 75,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 懒加载观察器
  useEffect(() => {
    if (priority) return // 优先级图片立即加载

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // 提前50px开始加载
      }
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority])

  // 处理图片加载成功
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // 处理图片加载失败
  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // 生成优化的图片URL
  const getOptimizedSrc = (originalSrc: string) => {
    // 如果是外部链接，直接返回
    if (originalSrc.startsWith('http')) {
      return originalSrc
    }

    // 本地图片优化逻辑
    const params = new URLSearchParams()
    if (width) params.set('w', width.toString())
    if (height) params.set('h', height.toString())
    params.set('q', quality.toString())
    
    return `${originalSrc}?${params.toString()}`
  }

  // 生成WebP格式的图片URL
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('http')) {
      return originalSrc
    }
    
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    return getOptimizedSrc(webpSrc)
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* 加载占位符 */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-leco-carbon via-leco-gray to-leco-carbon"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 border-2 border-leco-electric-blue border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        </motion.div>
      )}

      {/* 错误占位符 */}
      {hasError && (
        <div className="absolute inset-0 bg-leco-carbon flex items-center justify-center">
          <div className="text-center text-leco-silver">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">图片加载失败</p>
          </div>
        </div>
      )}

      {/* 实际图片 */}
      {isInView && (
        <picture>
          {/* WebP格式 */}
          <source 
            srcSet={getWebPSrc(src)} 
            type="image/webp" 
          />
          
          {/* 原始格式 */}
          <motion.img
            src={hasError ? placeholder : getOptimizedSrc(src)}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </picture>
      )}

      {/* 加载完成后的渐入效果 */}
      {isLoaded && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(0, 229, 255, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
      )}
    </div>
  )
}

export default OptimizedImage

// 预设的图片组件变体
export const HeroImage = (props: Omit<OptimizedImageProps, 'priority'>) => (
  <OptimizedImage {...props} priority={true} quality={90} />
)

export const ProductImage = (props: OptimizedImageProps) => (
  <OptimizedImage {...props} quality={85} />
)

export const ThumbnailImage = (props: OptimizedImageProps) => (
  <OptimizedImage {...props} quality={70} />
)
