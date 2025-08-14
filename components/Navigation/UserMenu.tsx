// 用户菜单组件

'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, MenuItem } from '@/types'

interface UserMenuProps {
  user?: User
  userMenuItems: MenuItem[]
  onLogin: () => void
  onLogout: () => void
  className?: string
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  userMenuItems,
  onLogin,
  onLogout,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 处理菜单项点击
  const handleMenuItemClick = (item: MenuItem) => {
    if (item.id === 'logout') {
      onLogout()
    }
    setIsOpen(false)
  }

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ESC 键关闭下拉菜单
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  if (!user) {
    // 未登录状态
    return (
      <button
        className={`px-4 py-2 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-semibold rounded-lg transition-colors duration-200 ${className}`}
        onClick={onLogin}
      >
        登录
      </button>
    )
  }

  // 已登录状态
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-leco-gray/20 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="用户菜单"
      >
        <div className="w-8 h-8 bg-leco-electric-blue rounded-full flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-leco-black font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-white text-sm font-medium">{user.name}</p>
          <p className="text-leco-silver text-xs">{user.email}</p>
        </div>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-leco-gray/95 backdrop-blur-md rounded-lg shadow-xl border border-leco-dark-silver/20 py-2 z-50">
          {/* 用户信息 */}
          <div className="px-4 py-3 border-b border-leco-dark-silver/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-leco-electric-blue rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-leco-black font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-leco-silver text-sm truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* 菜单项 */}
          <div className="py-2">
            {userMenuItems.map((item) => (
              <div key={item.id}>
                {item.id === 'logout' ? (
                  <button
                    className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-white hover:bg-leco-carbon/50 hover:text-leco-electric-blue transition-colors duration-200"
                    onClick={() => handleMenuItemClick(item)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-white hover:bg-leco-carbon/50 hover:text-leco-electric-blue transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {/* 根据菜单项 ID 显示不同图标 */}
                    {item.id === 'profile' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                    {item.id === 'orders' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                    {item.id === 'favorites' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {item.id === 'settings' && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-leco-energy-orange text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="px-4 py-3 border-t border-leco-dark-silver/20">
            <p className="text-xs text-leco-dark-silver text-center">
              LECO 会员 · 享受专属权益
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu