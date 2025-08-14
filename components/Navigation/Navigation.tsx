// 主导航组件

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { NavigationProps } from '@/types/components'
import { MenuItem } from '@/types'
import useApi from '@/hooks/useApi'
import useScrollPosition from '@/hooks/useScrollPosition'
import { useIsMobile, useIsDesktop } from '@/hooks/useMediaQuery'
import { API_ENDPOINTS } from '@/lib/constants'
import MobileMenu from './MobileMenu'
import SearchBox from './SearchBox'
import CartPreview from './CartPreview'
import UserMenu from './UserMenu'
import LanguageSelector from './LanguageSelector'

const Navigation: React.FC<NavigationProps> = ({
  currentLanguage,
  user,
  onLanguageChange,
  onLogin,
  onLogout,
  onCartOpen,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const scrollPosition = useScrollPosition()
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  // 判断是否已滚动
  const isScrolled = scrollPosition.y > 50

  // 获取菜单数据
  const { data: menuData, loading: menuLoading } = useApi<{
    items: MenuItem[]
    userMenu: MenuItem[]
  }>(API_ENDPOINTS.MENU)

  const menuItems = menuData?.items || []
  const userMenuItems = menuData?.userMenu || []

  // 关闭所有下拉菜单
  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    setIsSearchOpen(false)
    setIsCartPreviewOpen(false)
  }

  // 处理下拉菜单切换
  const toggleDropdown = (menuId: string) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId)
  }

  // 处理移动端菜单切换
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // 处理搜索框切换
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setActiveDropdown(null)
    setIsCartPreviewOpen(false)
  }

  // 处理购物车预览切换
  const toggleCartPreview = () => {
    setIsCartPreviewOpen(!isCartPreviewOpen)
    setActiveDropdown(null)
    setIsSearchOpen(false)
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        closeAllDropdowns()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // 滚动时关闭下拉菜单
  useEffect(() => {
    if (scrollPosition.y > 0) {
      closeAllDropdowns()
    }
  }, [scrollPosition.y])

  // ESC 键关闭下拉菜单
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns()
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-leco-black/95 backdrop-blur-md shadow-lg border-b border-leco-gray/20' 
            : 'bg-transparent'
          }
          ${className}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center space-x-2 group"
                onClick={closeAllDropdowns}
              >
                <div className="relative">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple rounded-lg flex items-center justify-center">
                    <span className="text-leco-black font-display font-bold text-lg lg:text-xl">
                      L
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <span className="text-white font-display font-bold text-xl lg:text-2xl tracking-wider">
                  LECO
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {isDesktop && (
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {menuItems.map((item) => (
                  <div key={item.id} className="relative dropdown-container">
                    {item.children ? (
                      // 有子菜单的项目
                      <button
                        className={`
                          flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200
                          ${activeDropdown === item.id
                            ? 'text-leco-electric-blue'
                            : 'text-white hover:text-leco-electric-blue'
                          }
                        `}
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {item.badge && (
                          <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ) : (
                      // 普通链接
                      <Link
                        href={item.href}
                        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white hover:text-leco-electric-blue transition-colors duration-200"
                        onClick={closeAllDropdowns}
                      >
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}

                    {/* 下拉菜单 */}
                    {item.children && activeDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-leco-gray/95 backdrop-blur-md rounded-lg shadow-xl border border-leco-dark-silver/20 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-leco-carbon/50 hover:text-leco-electric-blue transition-colors duration-200"
                            onClick={closeAllDropdowns}
                          >
                            <span>{child.label}</span>
                            {child.badge && (
                              <span className="px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />

              {/* Search Button */}
              <button
                className="p-2 text-white hover:text-leco-electric-blue transition-colors duration-200"
                onClick={toggleSearch}
                aria-label="搜索"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User Menu */}
              <UserMenu
                user={user}
                userMenuItems={userMenuItems}
                onLogin={onLogin}
                onLogout={onLogout}
              />

              {/* Cart Button */}
              <button
                className="relative p-2 text-white hover:text-leco-electric-blue transition-colors duration-200"
                onClick={toggleCartPreview}
                aria-label="购物车"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {/* Cart Badge */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-leco-energy-orange text-white text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  className="p-2 text-white hover:text-leco-electric-blue transition-colors duration-200 lg:hidden"
                  onClick={toggleMobileMenu}
                  aria-label="菜单"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-leco-gray">
            <div 
              className="h-full bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple transition-all duration-300"
              style={{
                width: `${Math.min((scrollPosition.y / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
              }}
            />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
        user={user}
      />

      {/* Search Box */}
      <SearchBox
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(query) => {
          console.log('Search:', query)
          // 这里处理搜索逻辑
        }}
      />

      {/* Cart Preview */}
      <CartPreview
        isOpen={isCartPreviewOpen}
        onClose={() => setIsCartPreviewOpen(false)}
        items={[]} // 这里传入购物车数据
        total={0}
        onViewCart={() => {
          setIsCartPreviewOpen(false)
          onCartOpen?.()
        }}
        onCheckout={() => {
          setIsCartPreviewOpen(false)
          // 跳转到结账页面
        }}
      />
    </>
  )
}

export default Navigation