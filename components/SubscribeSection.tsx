'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Check, Gift, Bell, Star, ArrowRight } from 'lucide-react'

const SubscribeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const benefits = [
    {
      icon: Gift,
      title: '专属优惠',
      description: '订阅用户享受新品首发优惠和限时折扣'
    },
    {
      icon: Bell,
      title: '最新资讯',
      description: '第一时间获取产品发布和活动信息'
    },
    {
      icon: Star,
      title: '会员特权',
      description: '专属会员活动和优先购买权'
    }
  ]

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('请输入邮箱地址')
      return
    }
    
    if (!validateEmail(email)) {
      setError('请输入有效的邮箱地址')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 这里可以调用实际的订阅API
      console.log('订阅邮箱:', email)
      
      setIsSubscribed(true)
      setEmail('')
    } catch (error) {
      setError('订阅失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsSubscribed(false)
    setError('')
  }

  return (
    <section 
      id="subscribe"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-black via-leco-gray to-leco-black relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-leco-electric-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-leco-plasma-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-leco-energy-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="sport-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {!isSubscribed ? (
            // 订阅表单
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* 标题区域 */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 229, 255, 0.3)',
                      '0 0 40px rgba(255, 107, 0, 0.3)',
                      '0 0 20px rgba(0, 229, 255, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="px-6 py-2 bg-gradient-to-r from-leco-electric-blue to-leco-energy-orange text-leco-black font-bold rounded-full text-sm uppercase tracking-wider">
                    SUBSCRIBE & SAVE
                  </span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                  <span className="text-gradient">订阅</span>
                  <span className="text-white"> LECO </span>
                  <span className="text-gradient">资讯</span>
                </h2>
                
                <p className="text-xl text-leco-silver max-w-2xl mx-auto leading-relaxed">
                  加入LECO会员，享受专属优惠和最新资讯，与我们一起探索运动的无限可能
                </p>
              </motion.div>

              {/* 会员权益 */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      className="bg-leco-gray rounded-xl p-6 border border-leco-carbon hover:border-leco-electric-blue/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-leco-electric-blue to-leco-plasma-purple rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent size={28} className="text-leco-black" />
                      </motion.div>
                      
                      <h3 className="text-lg font-bold text-white mb-2">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-leco-silver text-sm">
                        {benefit.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* 订阅表单 */}
              <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple rounded-lg blur opacity-20"
                      animate={{
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <div className="relative bg-leco-gray border border-leco-carbon rounded-lg p-4 flex items-center space-x-3">
                      <Mail size={20} className="text-leco-electric-blue flex-shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="输入您的邮箱地址"
                        className="flex-1 bg-transparent text-white placeholder-leco-silver focus:outline-none"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      className="text-red-400 text-sm text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple text-leco-black font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-leco-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>订阅中...</span>
                      </>
                    ) : (
                      <>
                        <span>立即订阅</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </form>

                <p className="text-xs text-leco-dark-silver text-center mt-4">
                  订阅即表示您同意接收LECO的营销邮件。您可以随时取消订阅。
                  <br />
                  我们承诺保护您的隐私，不会向第三方分享您的信息。
                </p>
              </motion.div>
            </motion.div>
          ) : (
            // 订阅成功页面
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-leco-neon-green to-leco-electric-blue rounded-full flex items-center justify-center mx-auto mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              >
                <Check size={48} className="text-leco-black" />
              </motion.div>

              <motion.h2
                className="text-4xl font-display font-black text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-gradient">订阅成功！</span>
              </motion.h2>

              <motion.p
                className="text-xl text-leco-silver mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                感谢您订阅LECO资讯！我们已向您的邮箱发送了确认邮件，
                <br />
                请查收并确认订阅以开始享受专属优惠。
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="bg-leco-gray rounded-lg p-6 border border-leco-carbon max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-white mb-3">接下来您将收到：</h3>
                  <ul className="text-leco-silver text-sm space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-leco-electric-blue rounded-full"></div>
                      <span>新品发布通知和首发优惠</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-leco-electric-blue rounded-full"></div>
                      <span>专业训练指导和健康资讯</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-leco-electric-blue rounded-full"></div>
                      <span>独家活动邀请和会员特权</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="px-6 py-3 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-semibold rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/#products'}
                  >
                    立即购物
                  </motion.button>
                  
                  <motion.button
                    className="px-6 py-3 border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black font-semibold rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                  >
                    再次订阅
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SubscribeSection
