'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  translations, 
  getTranslation, 
  DEFAULT_LOCALE, 
  SUPPORTED_LOCALES,
  type SupportedLocale 
} from '@/lib/translations'

// 语言变化事件
const LANGUAGE_CHANGE_EVENT = 'languageChange'

export function useTranslation() {
  const [locale, setLocale] = useState<SupportedLocale>(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  // 初始化语言设置
  useEffect(() => {
    setMounted(true)

    // 从localStorage获取保存的语言设置
    const savedLocale = localStorage.getItem('locale') as SupportedLocale

    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.toLowerCase()
      let detectedLocale: SupportedLocale = DEFAULT_LOCALE

      if (browserLang.startsWith('zh')) {
        detectedLocale = 'zh'
      } else if (browserLang.startsWith('en')) {
        detectedLocale = 'en'
      }

      setLocale(detectedLocale)
      // 保存到localStorage
      localStorage.setItem('locale', detectedLocale)
    }
  }, [])

  // 监听语言变化事件
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const newLocale = event.detail.locale as SupportedLocale
      if (SUPPORTED_LOCALES.includes(newLocale)) {
        setLocale(newLocale)
      }
    }

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener)
    
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener)
    }
  }, [])

  // 切换语言
  const changeLanguage = useCallback((newLocale: SupportedLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }

    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // 触发语言变化事件
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, {
      detail: { locale: newLocale }
    }))
  }, [])

  // 翻译函数
  const t = useCallback((key: string, fallback?: string): string => {
    if (!mounted) {
      return fallback || key
    }
    
    const translation = getTranslation(locale, key)
    return translation || fallback || key
  }, [locale, mounted])

  // 获取当前语言的翻译对象
  const getTranslations = useCallback(() => {
    return translations[locale]
  }, [locale])

  // 检查是否为指定语言
  const isLocale = useCallback((targetLocale: SupportedLocale) => {
    return locale === targetLocale
  }, [locale])

  return {
    locale,
    t,
    changeLanguage,
    getTranslations,
    isLocale,
    mounted,
    supportedLocales: SUPPORTED_LOCALES,
  }
}

// 语言切换的辅助函数（可在组件外使用）
export function changeLanguage(locale: SupportedLocale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.warn(`Unsupported locale: ${locale}`)
    return
  }

  localStorage.setItem('locale', locale)
  
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, {
    detail: { locale }
  }))
}

// 获取当前语言（可在组件外使用）
export function getCurrentLocale(): SupportedLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }
  
  const savedLocale = localStorage.getItem('locale') as SupportedLocale
  return SUPPORTED_LOCALES.includes(savedLocale) ? savedLocale : DEFAULT_LOCALE
}
