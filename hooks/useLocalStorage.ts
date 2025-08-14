// useLocalStorage Hook

import { useState, useEffect, useCallback } from 'react'
import { localStorage as storage } from '@/utils/storage'

/**
 * 使用 localStorage 的 Hook
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.get<T>(key)
      return item !== null ? item : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // 设置值的函数
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // 允许传入函数来更新状态
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // 保存到状态
      setStoredValue(valueToStore)
      
      // 保存到 localStorage
      storage.set(key, valueToStore)
      
      // 触发自定义事件，通知其他组件
      window.dispatchEvent(new CustomEvent('localStorage', {
        detail: { key, value: valueToStore }
      }))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // 删除值的函数
  const removeValue = useCallback(() => {
    try {
      storage.remove(key)
      setStoredValue(initialValue)
      
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('localStorage', {
        detail: { key, value: null }
      }))
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // 监听其他组件对同一 key 的修改
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value !== null ? e.detail.value : initialValue)
      }
    }

    window.addEventListener('localStorage', handleStorageChange as EventListener)
    
    return () => {
      window.removeEventListener('localStorage', handleStorageChange as EventListener)
    }
  }, [key, initialValue])

  // 监听原生 storage 事件（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue)
          setStoredValue(newValue.data)
        } catch (error) {
          console.error('Error parsing storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}