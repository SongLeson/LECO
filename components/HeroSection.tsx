'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Play, Volume2, VolumeX } from 'lucide-react'

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMuted, setIsMuted] = useState(true)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 100 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 100 })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => setIsVideoLoaded(true)
      video.addEventListener('loadeddata', handleLoadedData)
      
      // Try to autoplay video with proper error handling
      const playVideo = async () => {
        try {
          if (video.readyState >= 2) {
            await video.play()
          }
        } catch (error) {
          // Silently handle autoplay prevention
          console.log('Autoplay prevented, user interaction required')
        }
      }
      
      // Add a small delay to ensure video is ready
      const timer = setTimeout(playVideo, 500)
      
      return () => {
        clearTimeout(timer)
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const scrollToNext = () => {
    const nextSection = document.getElementById('products')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-leco-black"
      style={{ opacity }}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale, y, rotateX, rotateY }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Enhanced Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-leco-black/60 via-leco-black/20 to-leco-black/80" />
        
        {/* Electric Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute inset-0 bg-speed-gradient animate-pulse"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,229,255,0.2)_50%,transparent_100%)] animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(139,0,255,0.1)_50%,transparent_100%)] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Mouse Follow Light */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Main Logo and Tagline */}
        <motion.div
          className="space-y-8 mb-12"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Ultra-Enhanced LECO Logo */}
          <motion.div className="relative">
            <motion.h1
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-tight tracking-wider relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8,
                type: "spring",
                stiffness: 80 
              }}
            >
              <motion.span
                className="inline-block text-neon relative"
                animate={{ 
                  textShadow: [
                    '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF',
                    '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #8B00FF, 0 0 40px #8B00FF',
                    '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF'
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                style={{
                  background: 'linear-gradient(90deg, #00E5FF 0%, #8B00FF 50%, #FF6B00 100%)',
                  backgroundSize: '400% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                LECO
              </motion.span>
            </motion.h1>
            
            {/* Neon Outline Effect */}
            <motion.div
              className="absolute inset-0 font-display text-6xl md:text-8xl lg:text-9xl font-black leading-tight tracking-wider"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #00E5FF 50%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              LECO
            </motion.div>
          </motion.div>
          
          {/* Enhanced Tagline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.p
              className="text-3xl md:text-5xl font-bold text-white tracking-[0.2em] font-display"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(0,229,255,0.8), 0 0 30px rgba(0,229,255,0.6)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              — MOVE BEYOND LIMITS —
            </motion.p>
            <motion.p
              className="text-lg text-leco-silver tracking-widest font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              释放潜能，突破极限
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Ultra-Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <motion.button
            className="neon-button ripple-effect group relative px-12 py-6 text-lg font-bold tracking-wider"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 30px rgba(0,229,255,1), 0 0 60px rgba(139,0,255,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span>SHOP NOW</span>
              <motion.div
                className="w-8 h-8 rounded-full bg-leco-electric-blue/20 flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-xl"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.div>
            </span>
          </motion.button>
          
          <motion.button
            className="relative px-12 py-6 font-bold text-white border-2 border-leco-plasma-purple rounded-lg 
                       transition-all duration-300 hover:bg-leco-plasma-purple hover:text-black 
                       hover:shadow-2xl group electric-border text-lg tracking-wider"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 30px rgba(139,0,255,1), 0 0 60px rgba(255,107,0,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            <span className="flex items-center space-x-3 relative z-10">
              <Play size={24} className="group-hover:animate-bounce" />
              <span>EXPLORE</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Audio Control */}
        <motion.button
          onClick={toggleMute}
          className="absolute top-8 right-8 p-3 rounded-full bg-leco-black/50 border border-leco-electric-blue/30 
                     text-leco-electric-blue hover:bg-leco-electric-blue hover:text-black transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          onClick={scrollToNext}
          data-hover
        >
          <motion.div
            className="flex flex-col items-center space-y-3 text-leco-silver hover:text-leco-electric-blue transition-colors duration-300"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.span 
              className="text-sm font-medium tracking-[0.3em] font-display"
              animate={{
                textShadow: [
                  '0 0 5px rgba(0,229,255,0.3)',
                  '0 0 15px rgba(0,229,255,0.8)',
                  '0 0 5px rgba(0,229,255,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SCROLL
            </motion.span>
            <motion.div
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown size={28} className="neon-glow-blue" />
            </motion.div>
            
            {/* Scroll Progress Line */}
            <motion.div
              className="w-0.5 h-12 bg-gradient-to-b from-leco-electric-blue to-transparent"
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Particle Effects */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 
                ? 'w-2 h-2 bg-leco-electric-blue' 
                : i % 3 === 1 
                ? 'w-1.5 h-1.5 bg-leco-plasma-purple' 
                : 'w-1 h-1 bg-leco-energy-orange'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -150],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Electric Sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-leco-electric-blue to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 4,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced Performance Metrics */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-8 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        {[
          { label: 'SPEED', value: '99%', color: 'leco-electric-blue', icon: '⚡' },
          { label: 'POWER', value: '95%', color: 'leco-plasma-purple', icon: '💪' },
          { label: 'STYLE', value: '100%', color: 'leco-energy-orange', icon: '🔥' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            className="text-right group"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.8 + index * 0.2 }}
            whileHover={{ scale: 1.1, x: -10 }}
          >
            <motion.div
              className="relative p-4 rounded-lg backdrop-blur-sm border border-white/10 hover:border-leco-electric-blue/50 transition-all duration-300"
              whileHover={{ 
                boxShadow: `0 0 20px rgba(0,229,255,0.3)`,
                backgroundColor: 'rgba(0,229,255,0.05)'
              }}
            >
              <div className="flex items-center justify-end space-x-3 mb-2">
                <span className="text-2xl">{metric.icon}</span>
                <div className={`text-4xl font-black text-${metric.color} font-display`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3 + index * 0.3 }}
                  >
                    {metric.value}
                  </motion.span>
                </div>
              </div>
              <div className="text-sm text-leco-silver tracking-[0.2em] font-display">
                {metric.label}
              </div>
              
              {/* Progress Bar */}
              <motion.div
                className="mt-2 h-1 bg-leco-gray rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 3.2 + index * 0.3 }}
              >
                <motion.div
                  className={`h-full bg-${metric.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: metric.value }}
                  transition={{ duration: 1.5, delay: 3.4 + index * 0.3 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
