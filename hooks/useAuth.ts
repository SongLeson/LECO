// 用户认证 Hook

import { useState, useEffect, useCallback } from 'react'
import { User } from '@/types'
import { AuthResponse } from '@/types/api'
import { userStorage } from '@/utils/storage'
import { apiClient } from '@/utils/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

/**
 * 用户认证 Hook
 */
export default function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  })

  // 设置用户信息
  const setUser = useCallback((user: User | null) => {
    setAuthState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user,
      loading: false,
    }))

    if (user) {
      userStorage.setUser(user)
    } else {
      userStorage.removeUser()
    }
  }, [])

  // 设置错误信息
  const setError = useCallback((error: string | null) => {
    setAuthState(prev => ({ ...prev, error, loading: false }))
  }, [])

  // 设置加载状态
  const setLoading = useCallback((loading: boolean) => {
    setAuthState(prev => ({ ...prev, loading }))
  }, [])

  // 登录
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)

      const response: AuthResponse = await apiClient.post('/api/auth/login', credentials)

      if (response.success) {
        const { user, token, refreshToken } = response.data
        
        // 设置认证令牌
        apiClient.setAuthToken(token)
        
        // 保存令牌到本地存储
        if (credentials.rememberMe) {
          localStorage.setItem('leco_token', token)
          localStorage.setItem('leco_refresh_token', refreshToken)
        } else {
          sessionStorage.setItem('leco_token', token)
          sessionStorage.setItem('leco_refresh_token', refreshToken)
        }

        setUser(user)
        return { success: true, user }
      } else {
        setError(response.error || '登录失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '登录失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setUser, setError, setLoading])

  // 注册
  const register = useCallback(async (data: RegisterData) => {
    try {
      setLoading(true)
      setError(null)

      // 验证密码
      if (data.password !== data.confirmPassword) {
        setError('两次输入的密码不一致')
        return { success: false, error: '两次输入的密码不一致' }
      }

      if (!data.acceptTerms) {
        setError('请同意用户协议和隐私政策')
        return { success: false, error: '请同意用户协议和隐私政策' }
      }

      const response: AuthResponse = await apiClient.post('/api/auth/register', data)

      if (response.success) {
        const { user, token, refreshToken } = response.data
        
        // 设置认证令牌
        apiClient.setAuthToken(token)
        
        // 保存令牌到本地存储
        localStorage.setItem('leco_token', token)
        localStorage.setItem('leco_refresh_token', refreshToken)

        setUser(user)
        return { success: true, user }
      } else {
        setError(response.error || '注册失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setUser, setError, setLoading])

  // 登出
  const logout = useCallback(async () => {
    try {
      setLoading(true)

      // 调用登出 API
      await apiClient.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      // 清除本地数据
      apiClient.removeAuthToken()
      localStorage.removeItem('leco_token')
      localStorage.removeItem('leco_refresh_token')
      sessionStorage.removeItem('leco_token')
      sessionStorage.removeItem('leco_refresh_token')
      
      setUser(null)
    }
  }, [setUser, setLoading])

  // 刷新令牌
  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('leco_refresh_token') || 
                          sessionStorage.getItem('leco_refresh_token')

      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response: AuthResponse = await apiClient.post('/api/auth/refresh', {
        refreshToken,
      })

      if (response.success) {
        const { user, token, refreshToken: newRefreshToken } = response.data
        
        // 更新令牌
        apiClient.setAuthToken(token)
        
        // 保存新令牌
        if (localStorage.getItem('leco_token')) {
          localStorage.setItem('leco_token', token)
          localStorage.setItem('leco_refresh_token', newRefreshToken)
        } else {
          sessionStorage.setItem('leco_token', token)
          sessionStorage.setItem('leco_refresh_token', newRefreshToken)
        }

        setUser(user)
        return true
      } else {
        throw new Error(response.error || 'Token refresh failed')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      return false
    }
  }, [setUser, logout])

  // 获取用户信息
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.get('/api/user')

      if (response.success) {
        setUser(response.data)
      } else {
        throw new Error(response.error || 'Failed to fetch user')
      }
    } catch (error) {
      console.error('Fetch user failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch user')
      
      // 尝试刷新令牌
      const refreshed = await refreshToken()
      if (!refreshed) {
        logout()
      }
    }
  }, [setUser, setError, setLoading, refreshToken, logout])

  // 更新用户信息
  const updateUser = useCallback(async (userData: Partial<User>) => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.put('/api/user', userData)

      if (response.success) {
        setUser(response.data)
        return { success: true, user: response.data }
      } else {
        setError(response.error || '更新失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '更新失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setUser, setError, setLoading])

  // 修改密码
  const changePassword = useCallback(async (data: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      if (data.newPassword !== data.confirmPassword) {
        setError('两次输入的新密码不一致')
        return { success: false, error: '两次输入的新密码不一致' }
      }

      const response = await apiClient.put('/api/user/password', data)

      if (response.success) {
        return { success: true }
      } else {
        setError(response.error || '密码修改失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '密码修改失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setError, setLoading])

  // 忘记密码
  const forgotPassword = useCallback(async (email: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.post('/api/auth/forgot-password', { email })

      if (response.success) {
        return { success: true, message: '重置密码邮件已发送' }
      } else {
        setError(response.error || '发送失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '发送失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setError, setLoading])

  // 重置密码
  const resetPassword = useCallback(async (data: {
    token: string
    password: string
    confirmPassword: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      if (data.password !== data.confirmPassword) {
        setError('两次输入的密码不一致')
        return { success: false, error: '两次输入的密码不一致' }
      }

      const response = await apiClient.post('/api/auth/reset-password', data)

      if (response.success) {
        return { success: true, message: '密码重置成功' }
      } else {
        setError(response.error || '密码重置失败')
        return { success: false, error: response.error }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '密码重置失败'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }, [setError, setLoading])

  // 初始化认证状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 检查本地存储的用户信息
        const savedUser = userStorage.getUser()
        if (savedUser) {
          setUser(savedUser)
          return
        }

        // 检查令牌
        const token = localStorage.getItem('leco_token') || 
                     sessionStorage.getItem('leco_token')

        if (token) {
          apiClient.setAuthToken(token)
          await fetchUser()
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        setLoading(false)
      }
    }

    initAuth()
  }, [setUser, fetchUser, setLoading])

  // 监听存储变化（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'leco_user') {
        if (e.newValue) {
          try {
            const userData = JSON.parse(e.newValue)
            setUser(userData.data)
          } catch (error) {
            console.error('Failed to parse user data from storage:', error)
          }
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [setUser])

  return {
    // 状态
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,

    // 操作方法
    login,
    register,
    logout,
    refreshToken,
    fetchUser,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,

    // 辅助方法
    setError,
    clearError: () => setError(null),
  }
}