// 产品相关 Hook

import { useState, useCallback } from 'react'
import { Product } from '@/types'
import { ProductsApiRequest, ProductsApiResponse, AddToCartRequest } from '@/types/api'
import useApi, { useApiPost, usePaginatedApi } from './useApi'
import { API_ENDPOINTS } from '@/lib/constants'

/**
 * 获取产品列表 Hook
 */
export function useProducts(params: ProductsApiRequest = {}) {
  return usePaginatedApi<Product>(API_ENDPOINTS.PRODUCTS, {
    pageSize: params.limit || 12,
    params,
  })
}

/**
 * 获取热门产品 Hook
 */
export function useHotProducts(limit: number = 6) {
  return useApi<{ products: Product[] }>(API_ENDPOINTS.PRODUCTS, {
    params: { tag: 'hot', limit },
    dependencies: [limit],
  })
}

/**
 * 获取新品 Hook
 */
export function useNewProducts(limit: number = 6) {
  return useApi<{ products: Product[] }>(API_ENDPOINTS.PRODUCTS, {
    params: { tag: 'new', limit },
    dependencies: [limit],
  })
}

/**
 * 获取限量产品 Hook
 */
export function useLimitedProducts(limit: number = 6) {
  return useApi<{ products: Product[] }>(API_ENDPOINTS.PRODUCTS, {
    params: { tag: 'limited', limit },
    dependencies: [limit],
  })
}

/**
 * 获取单个产品详情 Hook
 */
export function useProduct(productId: string) {
  return useApi<Product>(`${API_ENDPOINTS.PRODUCT_DETAIL}/${productId}`, {
    immediate: !!productId,
    dependencies: [productId],
  })
}

/**
 * 按分类获取产品 Hook
 */
export function useProductsByCategory(category: string, params: Omit<ProductsApiRequest, 'category'> = {}) {
  return usePaginatedApi<Product>(API_ENDPOINTS.PRODUCTS, {
    pageSize: params.limit || 12,
    params: { ...params, category },
  })
}

/**
 * 产品搜索 Hook
 */
export function useProductSearch() {
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, filters: Partial<ProductsApiRequest> = {}) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)

      // 这里可以实现更复杂的搜索逻辑
      const response = await fetch(`${API_ENDPOINTS.PRODUCTS}?${new URLSearchParams({
        search: query,
        ...filters,
      } as any)}`)

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data: ProductsApiResponse = await response.json()
      
      if (data.success) {
        setSearchResults(data.data.products)
      } else {
        setError(data.error || 'Search failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearSearch = useCallback(() => {
    setSearchResults([])
    setError(null)
  }, [])

  return {
    searchResults,
    loading,
    error,
    search,
    clearSearch,
  }
}

/**
 * 产品收藏 Hook
 */
export function useProductFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  const addToFavorites = useApiPost<{ productId: string }, { success: boolean }>(
    API_ENDPOINTS.FAVORITES,
    {
      onSuccess: (data) => {
        if (data.success) {
          // 更新本地收藏状态
          setFavorites(prev => [...prev, data.productId])
        }
      },
    }
  )

  const removeFromFavorites = useCallback(async (productId: string) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.FAVORITES}/${productId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFavorites(prev => prev.filter(id => id !== productId))
      }
    } catch (error) {
      console.error('Failed to remove from favorites:', error)
    }
  }, [])

  const toggleFavorite = useCallback((productId: string) => {
    if (favorites.includes(productId)) {
      removeFromFavorites(productId)
    } else {
      addToFavorites.execute({ productId })
    }
  }, [favorites, addToFavorites.execute, removeFromFavorites])

  const isFavorite = useCallback((productId: string) => {
    return favorites.includes(productId)
  }, [favorites])

  return {
    favorites,
    addToFavorites: addToFavorites.execute,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    loading: addToFavorites.loading,
    error: addToFavorites.error,
  }
}

/**
 * 产品比较 Hook
 */
export function useProductComparison() {
  const [compareList, setCompareList] = useState<Product[]>([])

  const addToCompare = useCallback((product: Product) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev // 已存在，不重复添加
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), product] // 最多比较4个产品
      }
      return [...prev, product]
    })
  }, [])

  const removeFromCompare = useCallback((productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId))
  }, [])

  const clearCompare = useCallback(() => {
    setCompareList([])
  }, [])

  const isInCompare = useCallback((productId: string) => {
    return compareList.some(p => p.id === productId)
  }, [compareList])

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    compareCount: compareList.length,
  }
}

/**
 * 产品评价 Hook
 */
export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReviews = useCallback(async () => {
    if (!productId) return

    try {
      setLoading(true)
      setError(null)

      // 模拟获取评价数据
      const mockReviews = [
        {
          id: '1',
          userId: 'user1',
          userName: '张三',
          rating: 5,
          comment: '质量很好，穿着舒适！',
          createdAt: '2024-01-15T10:00:00Z',
          images: [],
        },
        {
          id: '2',
          userId: 'user2',
          userName: '李四',
          rating: 4,
          comment: '款式不错，性价比高。',
          createdAt: '2024-01-14T15:30:00Z',
          images: [],
        },
      ]

      setReviews(mockReviews)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    } finally {
      setLoading(false)
    }
  }, [productId])

  const addReview = useCallback(async (reviewData: {
    rating: number
    comment: string
    images?: string[]
  }) => {
    try {
      // 模拟添加评价
      const newReview = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: '当前用户',
        ...reviewData,
        createdAt: new Date().toISOString(),
      }

      setReviews(prev => [newReview, ...prev])
      return true
    } catch (error) {
      console.error('Failed to add review:', error)
      return false
    }
  }, [])

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    addReview,
  }
}

export default useProducts