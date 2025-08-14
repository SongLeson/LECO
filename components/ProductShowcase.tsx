'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Heart, ShoppingCart } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  colors: string[]
  isNew: boolean
  rating: number
}

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)

  const categories = [
    { id: 'all', name: 'ALL PRODUCTS' },
    { id: 'footwear', name: 'FOOTWEAR' },
    { id: 'apparel', name: 'APPAREL' },
    { id: 'accessories', name: 'ACCESSORIES' },
  ]

  const products: Product[] = [
    {
      id: 1,
      name: 'VELOCITY PRO X1',
      category: 'footwear',
      price: 299,
      image: '/images/products/shoe-1.jpg',
      colors: ['#000000', '#FF6B00', '#00D4FF'],
      isNew: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'AERO SPRINT ELITE',
      category: 'footwear',
      price: 349,
      image: '/images/products/shoe-2.jpg',
      colors: ['#FFFFFF', '#39FF14', '#8B00FF'],
      isNew: false,
      rating: 4.8
    },
    {
      id: 3,
      name: 'PERFORMANCE TEE',
      category: 'apparel',
      price: 89,
      image: '/images/products/tee-1.jpg',
      colors: ['#000000', '#FFFFFF', '#00D4FF'],
      isNew: true,
      rating: 4.7
    },
    {
      id: 4,
      name: 'POWER SHORTS',
      category: 'apparel',
      price: 129,
      image: '/images/products/shorts-1.jpg',
      colors: ['#000000', '#FF6B00'],
      isNew: false,
      rating: 4.6
    },
    {
      id: 5,
      name: 'SMART WATCH X',
      category: 'accessories',
      price: 499,
      image: '/images/products/watch-1.jpg',
      colors: ['#000000', '#E0E0E0'],
      isNew: true,
      rating: 4.9
    },
    {
      id: 6,
      name: 'HYDRO BOTTLE',
      category: 'accessories',
      price: 59,
      image: '/images/products/bottle-1.jpg',
      colors: ['#00D4FF', '#39FF14', '#FF6B00'],
      isNew: false,
      rating: 4.5
    },
  ]

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= filteredProducts.length - 3 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.max(0, filteredProducts.length - 3) : prev - 1
    )
  }

  return (
    <section 
      id="products"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-black via-leco-gray to-leco-black"
    >
      <div className="sport-container">
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-display text-5xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="text-neon block"
              animate={{
                textShadow: [
                  '0 0 10px #00E5FF, 0 0 20px #00E5FF',
                  '0 0 20px #00E5FF, 0 0 40px #8B00FF, 0 0 60px #8B00FF',
                  '0 0 10px #00E5FF, 0 0 20px #00E5FF'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              GEAR THAT
            </motion.span>
            <motion.span
              className="text-gradient block"
              style={{
                background: 'linear-gradient(90deg, #00E5FF 0%, #8B00FF 50%, #FF6B00 100%)',
                backgroundSize: '400% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              PERFORMS
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-leco-silver max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            工程师为冠军设计，专为突破性能而生。
            <br />
            体验尖端科技与运动卓越的完美融合。
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 font-bold tracking-wide rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-leco-blue to-leco-green text-leco-black'
                  : 'bg-leco-carbon text-white hover:bg-leco-blue hover:text-leco-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentSlide(0)
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Products Grid - 3 Rows x 2 Columns */}
        <div className="relative">
          {/* Electric Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full 
                       bg-leco-black/70 border-2 border-leco-electric-blue/30 
                       text-leco-electric-blue hover:border-leco-electric-blue 
                       hover:bg-leco-electric-blue hover:text-black 
                       transition-all duration-300 backdrop-blur-sm neon-glow-blue"
            whileHover={{ 
              scale: 1.2,
              boxShadow: "0 0 25px rgba(0,229,255,0.8)"
            }}
            whileTap={{ scale: 0.9 }}
            data-hover
          >
            <ChevronLeft size={28} />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full 
                       bg-leco-black/70 border-2 border-leco-electric-blue/30 
                       text-leco-electric-blue hover:border-leco-electric-blue 
                       hover:bg-leco-electric-blue hover:text-black 
                       transition-all duration-300 backdrop-blur-sm neon-glow-blue"
            whileHover={{ 
              scale: 1.2,
              boxShadow: "0 0 25px rgba(0,229,255,0.8)"
            }}
            whileTap={{ scale: 0.9 }}
            data-hover
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* 3x2 Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {filteredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                className="col-span-1"
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2 + (index * 0.15),
                  type: "spring",
                  stiffness: 100
                }}
              >
                  <motion.div 
                    className="relative group h-full"
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 2,
                      z: 50 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Neon Border Card */}
                    <div className="relative h-full min-h-[400px] p-8 rounded-2xl bg-gradient-to-br from-leco-black to-leco-gray 
                                    border-2 border-transparent bg-clip-padding
                                    before:absolute before:inset-0 before:-z-10 before:m-[-2px] before:rounded-2xl
                                    before:bg-gradient-to-r before:from-leco-electric-blue before:via-leco-plasma-purple before:to-leco-energy-orange
                                    group-hover:before:opacity-100 before:opacity-30 before:transition-opacity before:duration-500">
                      
                      {/* Electric Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(0,229,255,0.2) 0%, transparent 70%)',
                          filter: 'blur(20px)'
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      {/* Product Image */}
                      <div className="relative mb-6 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-500">
                        <motion.div 
                          className="aspect-[4/3] bg-gradient-to-br from-leco-carbon via-leco-gray to-leco-carbon 
                                     flex items-center justify-center relative overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                        >
                          {/* Product Representation */}
                          <motion.div 
                            className={`w-40 h-40 rounded-2xl flex items-center justify-center text-black 
                                       font-bold text-2xl font-display relative
                                       ${index % 3 === 0 
                                         ? 'bg-gradient-to-br from-leco-electric-blue to-leco-plasma-purple' 
                                         : index % 3 === 1 
                                         ? 'bg-gradient-to-br from-leco-plasma-purple to-leco-energy-orange'
                                         : 'bg-gradient-to-br from-leco-energy-orange to-leco-electric-blue'
                                       }`}
                            animate={{
                              rotateY: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {product.name.split(' ')[0]}
                            
                            {/* Holographic Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                          
                          {/* New Badge */}
                          {product.isNew && (
                            <motion.div
                              className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-leco-energy-orange to-leco-electric-blue 
                                         text-black text-sm font-bold rounded-full neon-glow-orange"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                delay: 1.5 + index * 0.1,
                                type: "spring",
                                stiffness: 500
                              }}
                            >
                              NEW
                            </motion.div>
                          )}

                          {/* Enhanced Hover Actions */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-leco-black/80 via-transparent to-transparent 
                                       flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 
                                       transition-all duration-500"
                          >
                            <div className="flex space-x-4">
                              <motion.button 
                                className="p-3 rounded-full bg-leco-electric-blue/20 backdrop-blur-md border border-leco-electric-blue/30
                                           text-leco-electric-blue hover:bg-leco-electric-blue hover:text-black 
                                           transition-all duration-300 neon-glow-blue"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.8 }}
                                data-hover
                              >
                                <Eye size={20} />
                              </motion.button>
                              <motion.button 
                                className="p-3 rounded-full bg-leco-plasma-purple/20 backdrop-blur-md border border-leco-plasma-purple/30
                                           text-leco-plasma-purple hover:bg-leco-plasma-purple hover:text-black 
                                           transition-all duration-300 neon-glow-purple"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.8 }}
                                data-hover
                              >
                                <Heart size={20} />
                              </motion.button>
                              <motion.button 
                                className="p-3 rounded-full bg-leco-energy-orange/20 backdrop-blur-md border border-leco-energy-orange/30
                                           text-leco-energy-orange hover:bg-leco-energy-orange hover:text-black 
                                           transition-all duration-300 neon-glow-orange"
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.8 }}
                                data-hover
                              >
                                <ShoppingCart size={20} />
                              </motion.button>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Enhanced Product Info */}
                      <div className="space-y-4">
                        <div>
                          <motion.h3 
                            className="font-display font-bold text-xl text-white group-hover:text-neon 
                                       transition-colors duration-300 tracking-wide"
                            whileHover={{
                              textShadow: "0 0 10px #00E5FF, 0 0 20px #00E5FF"
                            }}
                          >
                            {product.name}
                          </motion.h3>
                          <p className="text-leco-silver text-sm uppercase tracking-[0.2em] font-light">
                            {product.category}
                          </p>
                        </div>

                        {/* Enhanced Rating */}
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  i < Math.floor(product.rating)
                                    ? 'bg-leco-energy-orange neon-glow-orange'
                                    : 'bg-leco-carbon'
                                }`}
                                whileHover={{ scale: 1.3 }}
                                animate={{
                                  boxShadow: i < Math.floor(product.rating)
                                    ? ['0 0 5px #FF6B00', '0 0 15px #FF6B00', '0 0 5px #FF6B00']
                                    : '0 0 0px transparent'
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-leco-electric-blue font-bold">
                            {product.rating}
                          </span>
                        </div>

                        {/* Enhanced Colors */}
                        <div className="flex space-x-3">
                          {product.colors.map((color, colorIndex) => (
                            <motion.button
                              key={colorIndex}
                              className="w-8 h-8 rounded-full border-2 border-leco-carbon 
                                         hover:border-leco-electric-blue transition-all duration-300
                                         hover:scale-125 hover:shadow-lg"
                              style={{ backgroundColor: color }}
                              whileHover={{ 
                                scale: 1.3,
                                boxShadow: `0 0 20px ${color}`,
                                rotate: 180
                              }}
                              whileTap={{ scale: 0.9 }}
                              data-hover
                            />
                          ))}
                        </div>

                        {/* Enhanced Price & CTA */}
                        <div className="flex items-center justify-between pt-4">
                          <motion.span 
                            className="text-3xl font-black text-gradient font-display"
                            animate={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          >
                            ${product.price}
                          </motion.span>
                          <motion.button
                            className="neon-button px-6 py-3 text-sm font-bold tracking-wider"
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: "0 0 25px rgba(0,229,255,1)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            data-hover
                          >
                            <span>ADD TO CART</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </div>

        {/* Enhanced Navigation Dots */}
        <motion.div
          className="flex justify-center space-x-4 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {Array.from({ length: Math.ceil(filteredProducts.length / 6) }).map((_, index) => (
            <motion.button
              key={index}
              className={`relative transition-all duration-500 ${
                index === Math.floor(currentSlide / 6)
                  ? 'w-12 h-4'
                  : 'w-4 h-4'
              }`}
              onClick={() => setCurrentSlide(index * 6)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <div className={`w-full h-full rounded-full transition-all duration-500 ${
                index === Math.floor(currentSlide / 6)
                  ? 'bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple neon-glow-blue'
                  : 'bg-leco-carbon hover:bg-leco-silver'
              }`} />
              
              {index === Math.floor(currentSlide / 6) && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            className="neon-button px-12 py-6 text-xl font-bold tracking-wider relative overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(0,229,255,1), 0 0 80px rgba(139,0,255,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            <span className="relative z-10 flex items-center space-x-4">
              <span>VIEW ALL PRODUCTS</span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
            
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-leco-electric-blue via-leco-plasma-purple to-leco-energy-orange opacity-0 group-hover:opacity-100"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductShowcase
