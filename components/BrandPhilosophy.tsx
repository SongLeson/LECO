'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Zap, Target, Rocket } from 'lucide-react'

const BrandPhilosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const philosophies = [
    {
      id: 1,
      icon: Zap,
      title: "SPEED",
      subtitle: "VELOCITY UNLEASHED",
      description: "Every second counts. Every movement matters. Our gear is engineered to eliminate friction between you and your peak performance.",
      color: "leco-blue",
      position: "left"
    },
    {
      id: 2,
      icon: Target,
      title: "PRECISION",
      subtitle: "PERFECTION REFINED",
      description: "Precision isn't just accuracy—it's the difference between good and legendary. We craft every detail to perfection.",
      color: "leco-green",
      position: "right"
    },
    {
      id: 3,
      icon: Rocket,
      title: "BREAKTHROUGH",
      subtitle: "LIMITS TRANSCENDED",
      description: "When everyone else stops, we accelerate. Breaking barriers isn't just our mission—it's our DNA.",
      color: "leco-orange",
      position: "left"
    }
  ]

  return (
    <section
      id="philosophy" 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-leco-gray to-leco-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-leco-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-leco-green/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="sport-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="section-title mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OUR
            <span className="block">PHILOSOPHY</span>
          </motion.h2>
          <motion.p
            className="text-xl text-leco-silver max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We don&apos;t just make sports gear. We craft the tools that transform
            athletes into legends, moments into memories, and dreams into reality.
          </motion.p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="space-y-32">
          {philosophies.map((philosophy, index) => {

            return (
              <motion.div
                key={philosophy.id}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  philosophy.position === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.3 }}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: philosophy.position === 'left' ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.3 }}
                  >
                    <motion.div
                      className={`p-4 rounded-full bg-gradient-to-br from-${philosophy.color} to-${philosophy.color}/70`}
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    >
                      <philosophy.icon size={32} className="text-leco-black" />
                    </motion.div>
                    <div>
                      <h3 className={`text-4xl font-display font-black text-${philosophy.color}`}>
                        {philosophy.title}
                      </h3>
                      <p className="text-leco-silver text-lg tracking-wide">
                        {philosophy.subtitle}
                      </p>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-lg text-white leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.3 }}
                  >
                    {philosophy.description}
                  </motion.p>

                  <motion.div
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                  >
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-leco-blue to-leco-green 
                                 text-leco-black font-bold rounded-lg hover:shadow-lg 
                                 hover:shadow-leco-blue/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      LEARN MORE
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 border-2 border-leco-blue text-leco-blue 
                                 hover:bg-leco-blue hover:text-leco-black font-bold 
                                 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      EXPLORE
                    </motion.button>
                  </motion.div>
                </div>

                {/* Visual Side */}
                <motion.div
                  className="flex-1 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 + index * 0.3 }}
                >
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Main Visual Container */}
                    <motion.div
                      className={`aspect-square rounded-2xl bg-gradient-to-br from-${philosophy.color}/20 to-${philosophy.color}/5 
                                  border border-${philosophy.color}/30 backdrop-blur-sm relative overflow-hidden`}
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br from-${philosophy.color}/10 to-transparent`}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-${philosophy.color}/20 rounded-full blur-xl`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>

                      {/* Central Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className={`p-8 rounded-full bg-gradient-to-br from-${philosophy.color} to-${philosophy.color}/80`}
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <philosophy.icon size={64} className="text-leco-black" />
                        </motion.div>
                      </div>

                      {/* Floating Elements */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-3 h-3 bg-${philosophy.color} rounded-full`}
                          style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${30 + (i * 10)}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${philosophy.color}/20 to-transparent 
                                  blur-xl scale-110 opacity-50`}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1.1, 1.2, 1.1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r 
                       from-leco-blue via-leco-green to-leco-orange rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-leco-black font-bold text-lg">
              READY TO MOVE BEYOND LIMITS?
            </span>
            <motion.div
              className="w-8 h-8 bg-leco-black rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket size={16} className="text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandPhilosophy
