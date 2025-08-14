'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingCart, Menu, X, Globe } from 'lucide-react'
import SearchBox from './Navigation/SearchBox'
import CartPreview from './Navigation/CartPreview'
import UserMenu from './Navigation/UserMenu'
import LanguageSelector from './Navigation/LanguageSelector'
import ThemeToggle from './ThemeToggle'
import useCart from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'
import { useTranslation } from '@/hooks/useTranslation'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('zh')

  const { cart, getCartSummary } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { t, locale, changeLanguage } = useTranslation()
  const cartSummary = getCartSummary()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '/', key: 'home' },
    { name: t('nav.products'), href: '#products', key: 'products' },
    { name: t('nav.brand'), href: '#philosophy', key: 'brand' },
    { name: t('nav.events'), href: '#events', key: 'events' },
    { name: t('nav.news'), href: '#news', key: 'news' },
    { name: t('nav.subscribe'), href: '#subscribe', key: 'subscribe' },
  ]

  // 处理搜索
  const handleSearch = (query: string) => {
    console.log('搜索:', query)
    // 这里可以添加搜索逻辑
  }

  // 处理语言切换
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
    changeLanguage(language as 'zh' | 'en')
    console.log('切换语言:', language)
  }

  // 处理购物车操作
  const handleViewCart = () => {
    setIsCartOpen(false)
    // 跳转到购物车页面
    window.location.href = '/cart'
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    // 跳转到结账页面
    window.location.href = '/checkout'
  }

  // 处理用户操作
  const handleLogin = () => {
    setIsUserMenuOpen(false)
    window.location.href = '/login'
  }

  const handleLogout = async () => {
    try {
      await logout()
      setIsUserMenuOpen(false)
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-glass py-2'
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="sport-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="text-3xl font-display font-black text-gradient"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  LECO
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-leco-neon-green rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className="relative text-white hover:text-leco-electric-blue transition-colors duration-300 font-medium tracking-wide"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-leco-electric-blue to-leco-neon-green"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Language Selector */}
              <div className="hidden md:block">
                <LanguageSelector
                  currentLanguage={locale}
                  onLanguageChange={handleLanguageChange}
                />
              </div>

              {/* Search Button */}
              <motion.button
                className="p-2 hover:text-leco-electric-blue transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </motion.button>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  className="p-2 hover:text-leco-electric-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={20} />
                </motion.button>
                {isUserMenuOpen && (
                  <UserMenu
                    user={user}
                    userMenuItems={[
                      { id: 'profile', label: '个人资料', href: '/profile', icon: 'user' },
                      { id: 'orders', label: '我的订单', href: '/orders', icon: 'shopping-bag' },
                      { id: 'favorites', label: '我的收藏', href: '/favorites', icon: 'heart' },
                      { id: 'settings', label: '账户设置', href: '/settings', icon: 'settings' },
                      { id: 'logout', label: '退出登录', href: '#', icon: 'log-out' },
                    ]}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    className="absolute top-full right-0 mt-2"
                  />
                )}
              </div>

              {/* Shopping Cart */}
              <div className="relative">
                <motion.button
                  className="relative p-2 hover:text-leco-electric-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCart size={20} />
                  {cartSummary.itemCount > 0 && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-leco-energy-orange rounded-full flex items-center justify-center text-xs font-bold text-leco-black"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      {cartSummary.itemCount}
                    </motion.div>
                  )}
                </motion.button>
                <CartPreview
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                  onViewCart={handleViewCart}
                  onCheckout={handleCheckout}
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:text-leco-electric-blue transition-colors duration-300 ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-glass border-t border-leco-carbon/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="sport-container py-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      className="text-white hover:text-leco-electric-blue transition-colors duration-300 font-medium tracking-wide py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}

                  {/* Mobile Language Selector */}
                  <div className="pt-4 border-t border-leco-carbon/50">
                    <button
                      className="flex items-center space-x-2 text-white hover:text-leco-electric-blue transition-colors duration-300 font-medium tracking-wide py-2"
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    >
                      <Globe size={20} />
                      <span>语言 / Language</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <SearchBox
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </>
  )
}

export default Navigation
