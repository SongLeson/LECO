'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Mountain, Compass, Flame } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

const BrandPhilosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const philosophies = [
    {
      id: 1,
      icon: Mountain,
      title: t('philosophy.speed.title'),
      subtitle: t('philosophy.speed.subtitle'),
      description: t('philosophy.speed.description'),
      color: "leco-blue",
      position: "left",
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      icon: Compass,
      title: t('philosophy.precision.title'),
      subtitle: t('philosophy.precision.subtitle'),
      description: t('philosophy.precision.description'),
      color: "leco-green",
      position: "right",
      image: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      icon: Flame,
      title: t('philosophy.breakthrough.title'),
      subtitle: t('philosophy.breakthrough.subtitle'),
      description: t('philosophy.breakthrough.description'),
      color: "leco-orange",
      position: "left",
      image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-leco-black via-leco-gray to-leco-black overflow-hidden"
    >
      {/* Dynamic Mountain Background */}
      <div className="absolute inset-0">
        {/* Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-leco-black via-leco-gray/50 to-transparent"
             style={{
               clipPath: 'polygon(0 100%, 0 60%, 15% 45%, 25% 55%, 35% 40%, 50% 50%, 65% 35%, 80% 45%, 90% 30%, 100% 40%, 100% 100%)'
             }}
        />

        {/* Animated Energy Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-leco-electric-blue/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-leco-energy-orange/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.7, 0.4],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-leco-neon-green/25 rounded-full blur-xl"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.5, 0.9, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            {t('philosophy.title').split(' ').map((word, index) => (
              <span key={index} className={index > 0 ? "block" : ""}>
                {word}
              </span>
            ))}
          </motion.h2>
          <motion.p
            className="text-xl text-leco-silver max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('philosophy.subtitle')}
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
                      className="px-6 py-3 bg-gradient-to-r from-leco-electric-blue to-leco-neon-green
                                 text-leco-black font-bold rounded-lg hover:shadow-lg
                                 hover:shadow-leco-electric-blue/50 transition-all duration-300
                                 dark:text-leco-black dark:bg-gradient-to-r dark:from-leco-electric-blue dark:to-leco-neon-green
                                 hover:scale-105 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('philosophy.learnMore')}
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 border-2 border-leco-electric-blue text-leco-electric-blue
                                 hover:bg-leco-electric-blue hover:text-leco-black font-bold
                                 rounded-lg transition-all duration-300
                                 dark:border-leco-electric-blue dark:text-leco-electric-blue
                                 dark:hover:bg-leco-electric-blue dark:hover:text-leco-black
                                 hover:scale-105 active:scale-95"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('philosophy.explore')}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Visual Side - Extreme Sports Images */}
                <motion.div
                  className="flex-1 relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 + index * 0.3 }}
                >
                  <div className="relative w-full max-w-lg mx-auto">
                    {/* Main Image Container */}
                    <motion.div
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Extreme Sports Image */}
                      <Image
                        src={philosophy.image}
                        alt={philosophy.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Dynamic Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br from-${philosophy.color}/30 via-transparent to-leco-black/60`}
                        animate={{
                          opacity: [0.7, 0.9, 0.7],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Floating Icon */}
                      <motion.div
                        className="absolute top-6 right-6 p-4 rounded-full bg-leco-black/80 backdrop-blur-sm border border-white/20"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      >
                        <philosophy.icon size={32} className={`text-${philosophy.color}`} />
                      </motion.div>

                      {/* Energy Particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 bg-${philosophy.color} rounded-full`}
                          style={{
                            left: `${15 + (i * 10)}%`,
                            top: `${20 + (i * 8)}%`,
                          }}
                          animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5],
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}

                      {/* Bottom Gradient */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-leco-black/90 to-transparent" />

                      {/* Sport Category Label */}
                      <motion.div
                        className="absolute bottom-4 left-4 px-4 py-2 bg-leco-black/80 backdrop-blur-sm rounded-lg border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 + index * 0.3 }}
                      >
                        <span className={`text-${philosophy.color} font-bold text-sm tracking-wider uppercase`}>
                          {philosophy.title.split(' ')[0]}
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${philosophy.color}/20 to-transparent
                                  blur-2xl scale-110 opacity-40`}
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1.1, 1.3, 1.1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
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
                       from-leco-electric-blue via-leco-neon-green to-leco-energy-orange rounded-full
                       dark:from-leco-electric-blue dark:via-leco-neon-green dark:to-leco-energy-orange
                       hover:shadow-lg hover:shadow-leco-electric-blue/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-leco-black font-bold text-lg dark:text-leco-black">
              {t('philosophy.cta')}
            </span>
            <motion.div
              className="w-8 h-8 bg-leco-black rounded-full flex items-center justify-center
                         dark:bg-leco-black"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Flame size={16} className="text-white dark:text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandPhilosophy
