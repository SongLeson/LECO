// 移动端菜单组件

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MobileMenuProps } from '@/types/components'
import { MenuItem } from '@/types'

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  user,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // 切换子菜单展开状态
  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  // 处理链接点击
  const handleLinkClick = () => {
    onClose()
    setExpandedItems(new Set()) // 重置展开状态
  }

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC 键关闭菜单
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${className}`}>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 侧边菜单 */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-leco-black border-l border-leco-gray/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* 菜单头部 */}
        <div className="flex items-center justify-between p-6 border-b border-leco-gray/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple rounded-lg flex items-center justify-center">
              <span className="text-leco-black font-display font-bold text-lg">L</span>
            </div>
            <span className="text-white font-display font-bold text-xl tracking-wider">
              LECO
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-leco-silver hover:text-white transition-colors duration-200"
            aria-label="关闭菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 用户信息 */}
        {user ? (
          <div className="p-6 border-b border-leco-gray/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-leco-electric-blue rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-leco-black font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-leco-silver text-sm">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-leco-gray/20">
            <div className="space-y-3">
              <button className="w-full bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                登录
              </button>
              <button className="w-full border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                注册
              </button>
            </div>
          </div>
        )}

        {/* 菜单内容 */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  // 有子菜单的项目
                  <div>
                    <button
                      className="w-full flex items-center justify-between p-3 text-white hover:bg-leco-gray/30 rounded-lg transition-colors duration-200"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {/* 这里可以根据 icon 名称渲染不同的图标 */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        )}
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          expandedItems.has(item.id) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* 子菜单 */}
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedItems.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="ml-8 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="flex items-center justify-between p-3 text-leco-silver hover:text-white hover:bg-leco-carbon/30 rounded-lg transition-colors duration-200"
                            onClick={handleLinkClick}
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
                    </div>
                  </div>
                ) : (
                  // 普通链接
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 p-3 text-white hover:bg-leco-gray/30 rounded-lg transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    {item.icon && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {/* 这里可以根据 icon 名称渲染不同的图标 */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* 菜单底部 */}
        <div className="p-6 border-t border-leco-gray/20">
          <div className="space-y-4">
            {/* 社交媒体链接 */}
            <div className="flex items-center justify-center space-x-4">
              <a
                href="#"
                className="p-2 text-leco-silver hover:text-leco-electric-blue transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-leco-silver hover:text-leco-electric-blue transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-leco-silver hover:text-leco-electric-blue transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* 版权信息 */}
            <p className="text-center text-xs text-leco-dark-silver">
              © 2024 LECO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu