// 语言选择器组件

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { SUPPORTED_LANGUAGES } from '@/lib/constants'

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
  className?: string
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  // 处理语言切换
  const handleLanguageChange = (languageCode: string) => {
    onLanguageChange(languageCode)
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:text-leco-electric-blue transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="选择语言"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-leco-gray/95 backdrop-blur-md rounded-lg shadow-xl border border-leco-dark-silver/20 py-2 z-50">
          {SUPPORTED_LANGUAGES.map((language) => (
            <button
              key={language.code}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200
                ${currentLanguage === language.code
                  ? 'text-leco-electric-blue bg-leco-carbon/30'
                  : 'text-white hover:bg-leco-carbon/50 hover:text-leco-electric-blue'
                }
              `}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector