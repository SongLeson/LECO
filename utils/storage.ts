// 本地存储工具函数

import { STORAGE_KEYS } from '@/lib/constants'

/**
 * 安全的 localStorage 操作
 */
export const localStorage = {
  /**
   * 设置数据到 localStorage
   */
  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      const serializedValue = JSON.stringify({
        data: value,
        timestamp: Date.now(),
      })
      
      window.localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error('localStorage.set error:', error)
      return false
    }
  },

  /**
   * 从 localStorage 获取数据
   */
  get: <T>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return null
      
      const item = window.localStorage.getItem(key)
      if (!item) return null
      
      const parsed = JSON.parse(item)
      return parsed.data
    } catch (error) {
      console.error('localStorage.get error:', error)
      return null
    }
  },

  /**
   * 从 localStorage 获取数据（带过期时间）
   */
  getWithExpiry: <T>(key: string, expiryTime: number): T | null => {
    try {
      if (typeof window === 'undefined') return null
      
      const item = window.localStorage.getItem(key)
      if (!item) return null
      
      const parsed = JSON.parse(item)
      const now = Date.now()
      
      if (now - parsed.timestamp > expiryTime) {
        window.localStorage.removeItem(key)
        return null
      }
      
      return parsed.data
    } catch (error) {
      console.error('localStorage.getWithExpiry error:', error)
      return null
    }
  },

  /**
   * 删除 localStorage 数据
   */
  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('localStorage.remove error:', error)
      return false
    }
  },

  /**
   * 清空 localStorage
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('localStorage.clear error:', error)
      return false
    }
  },

  /**
   * 检查 localStorage 是否可用
   */
  isAvailable: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      const testKey = '__localStorage_test__'
      window.localStorage.setItem(testKey, 'test')
      window.localStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  },
}

/**
 * 安全的 sessionStorage 操作
 */
export const sessionStorage = {
  /**
   * 设置数据到 sessionStorage
   */
  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      const serializedValue = JSON.stringify({
        data: value,
        timestamp: Date.now(),
      })
      
      window.sessionStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error('sessionStorage.set error:', error)
      return false
    }
  },

  /**
   * 从 sessionStorage 获取数据
   */
  get: <T>(key: string): T | null => {
    try {
      if (typeof window === 'undefined') return null
      
      const item = window.sessionStorage.getItem(key)
      if (!item) return null
      
      const parsed = JSON.parse(item)
      return parsed.data
    } catch (error) {
      console.error('sessionStorage.get error:', error)
      return null
    }
  },

  /**
   * 删除 sessionStorage 数据
   */
  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      window.sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('sessionStorage.remove error:', error)
      return false
    }
  },

  /**
   * 清空 sessionStorage
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      window.sessionStorage.clear()
      return true
    } catch (error) {
      console.error('sessionStorage.clear error:', error)
      return false
    }
  },

  /**
   * 检查 sessionStorage 是否可用
   */
  isAvailable: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      const testKey = '__sessionStorage_test__'
      window.sessionStorage.setItem(testKey, 'test')
      window.sessionStorage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  },
}

/**
 * Cookie 操作工具
 */
export const cookie = {
  /**
   * 设置 Cookie
   */
  set: (
    name: string,
    value: string,
    options: {
      expires?: number | Date
      path?: string
      domain?: string
      secure?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
    } = {}
  ): void => {
    if (typeof document === 'undefined') return
    
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    
    if (options.expires) {
      const expires = typeof options.expires === 'number'
        ? new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000)
        : options.expires
      cookieString += `; expires=${expires.toUTCString()}`
    }
    
    if (options.path) {
      cookieString += `; path=${options.path}`
    }
    
    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }
    
    if (options.secure) {
      cookieString += '; secure'
    }
    
    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }
    
    document.cookie = cookieString
  },

  /**
   * 获取 Cookie
   */
  get: (name: string): string | null => {
    if (typeof document === 'undefined') return null
    
    const nameEQ = encodeURIComponent(name) + '='
    const cookies = document.cookie.split(';')
    
    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }
    
    return null
  },

  /**
   * 删除 Cookie
   */
  remove: (name: string, path?: string, domain?: string): void => {
    cookie.set(name, '', {
      expires: new Date(0),
      path,
      domain,
    })
  },

  /**
   * 检查 Cookie 是否存在
   */
  exists: (name: string): boolean => {
    return cookie.get(name) !== null
  },
}

/**
 * 存储配额检查
 */
export const checkStorageQuota = async (): Promise<{
  quota: number
  usage: number
  available: number
  percentage: number
}> => {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return { quota: 0, usage: 0, available: 0, percentage: 0 }
  }
  
  try {
    const estimate = await navigator.storage.estimate()
    const quota = estimate.quota || 0
    const usage = estimate.usage || 0
    const available = quota - usage
    const percentage = quota > 0 ? (usage / quota) * 100 : 0
    
    return { quota, usage, available, percentage }
  } catch (error) {
    console.error('Storage quota check failed:', error)
    return { quota: 0, usage: 0, available: 0, percentage: 0 }
  }
}

/**
 * 清理过期的存储数据
 */
export const cleanupExpiredStorage = (prefix: string = 'leco_'): void => {
  if (!localStorage.isAvailable()) return
  
  try {
    const keys = Object.keys(window.localStorage)
    const expiredKeys: string[] = []
    
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        try {
          const item = window.localStorage.getItem(key)
          if (item) {
            const parsed = JSON.parse(item)
            const now = Date.now()
            
            // 如果数据超过 7 天，标记为过期
            if (parsed.timestamp && now - parsed.timestamp > 7 * 24 * 60 * 60 * 1000) {
              expiredKeys.push(key)
            }
          }
        } catch {
          // 如果解析失败，也标记为过期
          expiredKeys.push(key)
        }
      }
    })
    
    expiredKeys.forEach(key => {
      window.localStorage.removeItem(key)
    })
    
    if (expiredKeys.length > 0) {
      console.log(`Cleaned up ${expiredKeys.length} expired storage items`)
    }
  } catch (error) {
    console.error('Storage cleanup failed:', error)
  }
}

/**
 * 业务相关的存储操作
 */
export const userStorage = {
  setUser: (user: any) => localStorage.set(STORAGE_KEYS.USER, user),
  getUser: () => localStorage.get(STORAGE_KEYS.USER),
  removeUser: () => localStorage.remove(STORAGE_KEYS.USER),
}

export const cartStorage = {
  setCart: (cart: any) => localStorage.set(STORAGE_KEYS.CART, cart),
  getCart: () => localStorage.get(STORAGE_KEYS.CART),
  removeCart: () => localStorage.remove(STORAGE_KEYS.CART),
}

export const preferencesStorage = {
  setLanguage: (language: string) => localStorage.set(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => localStorage.get<string>(STORAGE_KEYS.LANGUAGE),
  
  setTheme: (theme: string) => localStorage.set(STORAGE_KEYS.THEME, theme),
  getTheme: () => localStorage.get<string>(STORAGE_KEYS.THEME),
  
  setPreferences: (preferences: any) => localStorage.set(STORAGE_KEYS.PREFERENCES, preferences),
  getPreferences: () => localStorage.get(STORAGE_KEYS.PREFERENCES),
}