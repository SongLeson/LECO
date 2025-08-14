// API 工具函数

import { ApiRequestConfig, ApiResponse, ApiError } from '@/types/api'
import { api as apiConfig } from '@/lib/config'

/**
 * API 客户端类
 */
class ApiClient {
  private baseURL: string
  private timeout: number
  private retries: number
  private defaultHeaders: Record<string, string>

  constructor(config = apiConfig) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
    this.retries = config.retries
    this.defaultHeaders = config.headers
  }

  /**
   * 发送 HTTP 请求
   */
  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      timeout = this.timeout,
      retries = this.retries,
    } = config

    // 构建 URL
    const url = new URL(endpoint, this.baseURL)
    
    // 添加查询参数
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    // 合并请求头
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    }

    // 构建请求配置
    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    }

    // 添加超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    requestConfig.signal = controller.signal

    let lastError: Error | null = null

    // 重试逻辑
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url.toString(), requestConfig)
        clearTimeout(timeoutId)

        // 检查响应状态
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new ApiError(
            response.status,
            errorData.message || response.statusText,
            errorData
          )
        }

        // 解析响应数据
        const data = await response.json()
        return data as ApiResponse<T>

      } catch (error) {
        lastError = error as Error
        
        // 如果是最后一次尝试，抛出错误
        if (attempt === retries) {
          break
        }

        // 等待一段时间后重试
        await this.delay(Math.pow(2, attempt) * 1000)
      }
    }

    clearTimeout(timeoutId)
    throw lastError
  }

  /**
   * GET 请求
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  /**
   * POST 请求
   */
  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body })
  }

  /**
   * PUT 请求
   */
  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body })
  }

  /**
   * DELETE 请求
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  /**
   * PATCH 请求
   */
  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body })
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * 设置认证令牌
   */
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  /**
   * 移除认证令牌
   */
  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }

  /**
   * 设置默认请求头
   */
  setDefaultHeader(key: string, value: string) {
    this.defaultHeaders[key] = value
  }

  /**
   * 移除默认请求头
   */
  removeDefaultHeader(key: string) {
    delete this.defaultHeaders[key]
  }
}

/**
 * API 错误类
 */
class ApiError extends Error {
  public status: number
  public data: any

  constructor(status: number, message: string, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// 创建默认的 API 客户端实例
export const apiClient = new ApiClient()

// 导出 API 错误类
export { ApiError }

/**
 * 处理 API 错误
 */
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return new ApiError(408, '请求超时', { type: 'timeout' })
    }
    
    if (error.message.includes('Failed to fetch')) {
      return new ApiError(0, '网络连接失败', { type: 'network' })
    }

    return new ApiError(500, error.message, { type: 'unknown' })
  }

  return new ApiError(500, '未知错误', { type: 'unknown' })
}

/**
 * 创建带缓存的 API 请求
 */
export const createCachedRequest = <T>(
  requestFn: () => Promise<ApiResponse<T>>,
  cacheKey: string,
  ttl: number = 5 * 60 * 1000 // 5分钟
) => {
  const cache = new Map<string, { data: T; timestamp: number }>()

  return async (): Promise<ApiResponse<T>> => {
    const now = Date.now()
    const cached = cache.get(cacheKey)

    // 检查缓存是否有效
    if (cached && now - cached.timestamp < ttl) {
      return {
        data: cached.data,
        success: true,
        message: 'From cache',
      }
    }

    try {
      const response = await requestFn()
      
      // 缓存成功的响应
      if (response.success) {
        cache.set(cacheKey, {
          data: response.data,
          timestamp: now,
        })
      }

      return response
    } catch (error) {
      // 如果有缓存数据，在错误时返回缓存
      if (cached) {
        console.warn('API request failed, returning cached data:', error)
        return {
          data: cached.data,
          success: true,
          message: 'From cache (fallback)',
        }
      }
      
      throw error
    }
  }
}

/**
 * 批量请求
 */
export const batchRequests = async <T>(
  requests: Array<() => Promise<ApiResponse<T>>>
): Promise<Array<ApiResponse<T> | ApiError>> => {
  const results = await Promise.allSettled(
    requests.map(request => request())
  )

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return handleApiError(result.reason)
    }
  })
}

/**
 * 并发限制的批量请求
 */
export const batchRequestsWithLimit = async <T>(
  requests: Array<() => Promise<ApiResponse<T>>>,
  limit: number = 5
): Promise<Array<ApiResponse<T> | ApiError>> => {
  const results: Array<ApiResponse<T> | ApiError> = []
  
  for (let i = 0; i < requests.length; i += limit) {
    const batch = requests.slice(i, i + limit)
    const batchResults = await batchRequests(batch)
    results.push(...batchResults)
  }

  return results
}

/**
 * 请求拦截器
 */
export const createRequestInterceptor = (
  interceptor: (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>
) => {
  const originalRequest = apiClient['request']
  
  apiClient['request'] = async function<T>(endpoint: string, config: ApiRequestConfig = {}) {
    const interceptedConfig = await interceptor(config)
    return originalRequest.call(this, endpoint, interceptedConfig)
  }
}

/**
 * 响应拦截器
 */
export const createResponseInterceptor = (
  interceptor: (response: any) => any | Promise<any>
) => {
  const originalRequest = apiClient['request']
  
  apiClient['request'] = async function<T>(endpoint: string, config: ApiRequestConfig = {}) {
    const response = await originalRequest.call(this, endpoint, config)
    return await interceptor(response)
  }
}