// API 数据获取 Hook

import { useState, useEffect, useCallback } from 'react'
import { apiClient, handleApiError, ApiError } from '@/utils/api'
import { ApiResponse } from '@/types/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
  refetch: () => Promise<void>
}

/**
 * 通用 API 数据获取 Hook
 */
export default function useApi<T>(
  endpoint: string,
  options: {
    immediate?: boolean
    params?: Record<string, any>
    dependencies?: any[]
    onSuccess?: (data: T) => void
    onError?: (error: ApiError) => void
  } = {}
): UseApiState<T> {
  const {
    immediate = true,
    params,
    dependencies = [],
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<T> = await apiClient.get(endpoint, params)
      
      if (response.success) {
        setData(response.data)
        onSuccess?.(response.data)
      } else {
        const apiError = new ApiError(400, response.error || 'API request failed')
        setError(apiError)
        onError?.(apiError)
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError)
      onError?.(apiError)
    } finally {
      setLoading(false)
    }
  }, [endpoint, params, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [immediate, fetchData, ...dependencies])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

/**
 * POST 请求 Hook
 */
export function useApiPost<TRequest, TResponse>(
  endpoint: string,
  options: {
    onSuccess?: (data: TResponse) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const { onSuccess, onError } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (data: TRequest): Promise<TResponse | null> => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<TResponse> = await apiClient.post(endpoint, data)
      
      if (response.success) {
        onSuccess?.(response.data)
        return response.data
      } else {
        const apiError = new ApiError(400, response.error || 'API request failed')
        setError(apiError)
        onError?.(apiError)
        return null
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError)
      onError?.(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }, [endpoint, onSuccess, onError])

  return {
    execute,
    loading,
    error,
  }
}

/**
 * PUT 请求 Hook
 */
export function useApiPut<TRequest, TResponse>(
  endpoint: string,
  options: {
    onSuccess?: (data: TResponse) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const { onSuccess, onError } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (data: TRequest): Promise<TResponse | null> => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<TResponse> = await apiClient.put(endpoint, data)
      
      if (response.success) {
        onSuccess?.(response.data)
        return response.data
      } else {
        const apiError = new ApiError(400, response.error || 'API request failed')
        setError(apiError)
        onError?.(apiError)
        return null
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError)
      onError?.(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }, [endpoint, onSuccess, onError])

  return {
    execute,
    loading,
    error,
  }
}

/**
 * DELETE 请求 Hook
 */
export function useApiDelete<TResponse>(
  endpoint: string,
  options: {
    onSuccess?: (data: TResponse) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const { onSuccess, onError } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(async (): Promise<TResponse | null> => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<TResponse> = await apiClient.delete(endpoint)
      
      if (response.success) {
        onSuccess?.(response.data)
        return response.data
      } else {
        const apiError = new ApiError(400, response.error || 'API request failed')
        setError(apiError)
        onError?.(apiError)
        return null
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError)
      onError?.(apiError)
      return null
    } finally {
      setLoading(false)
    }
  }, [endpoint, onSuccess, onError])

  return {
    execute,
    loading,
    error,
  }
}

/**
 * 分页数据获取 Hook
 */
export function usePaginatedApi<T>(
  endpoint: string,
  options: {
    pageSize?: number
    initialPage?: number
    params?: Record<string, any>
    onSuccess?: (data: T[], pagination: any) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const {
    pageSize = 12,
    initialPage = 1,
    params = {},
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [page, setPage] = useState(initialPage)
  const [pagination, setPagination] = useState<any>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true)
      setError(null)

      const response: ApiResponse<{ items?: T[]; products?: T[]; pagination: any }> = await apiClient.get(endpoint, {
        ...params,
        page: pageNum,
        limit: pageSize,
      })
      
      if (response.success) {
        const items = response.data.items || response.data.products || []
        const paginationData = response.data.pagination

        if (reset) {
          setData(items)
        } else {
          setData(prev => [...prev, ...items])
        }

        setPagination(paginationData)
        setHasMore(paginationData?.hasNext || false)
        onSuccess?.(items, paginationData)
      } else {
        const apiError = new ApiError(400, response.error || 'API request failed')
        setError(apiError)
        onError?.(apiError)
      }
    } catch (err) {
      const apiError = handleApiError(err)
      setError(apiError)
      onError?.(apiError)
    } finally {
      setLoading(false)
    }
  }, [endpoint, params, pageSize, onSuccess, onError])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchData(nextPage, false)
    }
  }, [loading, hasMore, page, fetchData])

  const refresh = useCallback(() => {
    setPage(initialPage)
    fetchData(initialPage, true)
  }, [initialPage, fetchData])

  useEffect(() => {
    fetchData(initialPage, true)
  }, [fetchData, initialPage])

  return {
    data,
    loading,
    error,
    pagination,
    hasMore,
    loadMore,
    refresh,
  }
}

/**
 * 无限滚动数据获取 Hook
 */
export function useInfiniteApi<T>(
  endpoint: string,
  options: {
    pageSize?: number
    params?: Record<string, any>
    threshold?: number
    onSuccess?: (data: T[], pagination: any) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const {
    pageSize = 12,
    params = {},
    threshold = 0.8,
    onSuccess,
    onError,
  } = options

  const paginatedApi = usePaginatedApi<T>(endpoint, {
    pageSize,
    params,
    onSuccess,
    onError,
  })

  // 监听滚动事件，自动加载更多
  useEffect(() => {
    const handleScroll = () => {
      if (paginatedApi.loading || !paginatedApi.hasMore) return

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

      if (scrollPercentage >= threshold) {
        paginatedApi.loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [paginatedApi.loading, paginatedApi.hasMore, paginatedApi.loadMore, threshold])

  return paginatedApi
}