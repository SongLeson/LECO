// 搜索功能 Hook

import { useState, useCallback, useEffect } from 'react'
import { Product, Category } from '@/types'
import { SearchApiResponse } from '@/types/api'
import { API_ENDPOINTS } from '@/lib/constants'
import useDebounce from './useDebounce'

interface SearchState {
  query: string
  results: {
    products: Product[]
    categories: Category[]
    keywords: string[]
  }
  loading: boolean
  error: string | null
  isOpen: boolean
}

interface UseSearchOptions {
  debounceDelay?: number
  minQueryLength?: number
  maxResults?: number
  onSearch?: (query: string) => void
  onSelect?: (item: any, type: 'product' | 'category' | 'keyword') => void
}

/**
 * 搜索功能 Hook
 */
export default function useSearch(options: UseSearchOptions = {}) {
  const {
    debounceDelay = 300,
    minQueryLength = 2,
    maxResults = 10,
    onSearch,
    onSelect,
  } = options

  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: {
      products: [],
      categories: [],
      keywords: [],
    },
    loading: false,
    error: null,
    isOpen: false,
  })

  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // 防抖查询
  const debouncedQuery = useDebounce(searchState.query, debounceDelay)

  // 执行搜索
  const performSearch = useCallback(async (query: string) => {
    if (!query || query.length < minQueryLength) {
      setSearchState(prev => ({
        ...prev,
        results: { products: [], categories: [], keywords: [] },
        loading: false,
        error: null,
      }))
      return
    }

    try {
      setSearchState(prev => ({ ...prev, loading: true, error: null }))

      const params = new URLSearchParams({
        q: query,
        limit: maxResults.toString(),
      })

      const response = await fetch(`${API_ENDPOINTS.SEARCH}?${params}`)
      
      if (!response.ok) {
        throw new Error('搜索请求失败')
      }

      const data: SearchApiResponse = await response.json()

      if (data.success) {
        setSearchState(prev => ({
          ...prev,
          results: data.data,
          loading: false,
        }))
      } else {
        throw new Error(data.error || '搜索失败')
      }
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : '搜索失败',
        results: { products: [], categories: [], keywords: [] },
      }))
    }
  }, [minQueryLength, maxResults])

  // 监听防抖后的查询变化
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery)
      onSearch?.(debouncedQuery)
    }
  }, [debouncedQuery, performSearch, onSearch])

  // 设置搜索查询
  const setQuery = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query }))
  }, [])

  // 打开搜索
  const openSearch = useCallback(() => {
    setSearchState(prev => ({ ...prev, isOpen: true }))
  }, [])

  // 关闭搜索
  const closeSearch = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isOpen: false,
      query: '',
      results: { products: [], categories: [], keywords: [] },
      error: null,
    }))
  }, [])

  // 清空搜索
  const clearSearch = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      query: '',
      results: { products: [], categories: [], keywords: [] },
      error: null,
    }))
  }, [])

  // 选择搜索结果
  const selectResult = useCallback((item: any, type: 'product' | 'category' | 'keyword') => {
    // 添加到搜索历史
    const searchTerm = type === 'keyword' ? item : item.name || item.label
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)] // 保留最近10个
      setSearchHistory(newHistory)
      
      // 保存到本地存储
      try {
        localStorage.setItem('leco_search_history', JSON.stringify(newHistory))
      } catch (error) {
        console.error('Failed to save search history:', error)
      }
    }

    onSelect?.(item, type)
    closeSearch()
  }, [searchHistory, onSelect, closeSearch])

  // 删除搜索历史项
  const removeFromHistory = useCallback((term: string) => {
    const newHistory = searchHistory.filter(item => item !== term)
    setSearchHistory(newHistory)
    
    try {
      localStorage.setItem('leco_search_history', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Failed to update search history:', error)
    }
  }, [searchHistory])

  // 清空搜索历史
  const clearHistory = useCallback(() => {
    setSearchHistory([])
    
    try {
      localStorage.removeItem('leco_search_history')
    } catch (error) {
      console.error('Failed to clear search history:', error)
    }
  }, [])

  // 从本地存储加载搜索历史
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('leco_search_history')
      if (savedHistory) {
        const history = JSON.parse(savedHistory)
        if (Array.isArray(history)) {
          setSearchHistory(history)
        }
      }
    } catch (error) {
      console.error('Failed to load search history:', error)
    }
  }, [])

  // 获取热门搜索词
  const getPopularSearches = useCallback(() => {
    // 这里可以从 API 获取热门搜索词，现在返回模拟数据
    return [
      '运动鞋',
      '跑步鞋',
      '篮球鞋',
      '运动服',
      'T恤',
      '短裤',
      '背包',
      '水杯',
    ]
  }, [])

  // 获取搜索建议
  const getSuggestions = useCallback(() => {
    const { products, categories, keywords } = searchState.results
    const suggestions = []

    // 添加产品建议
    products.forEach(product => {
      suggestions.push({
        type: 'product' as const,
        item: product,
        label: product.name,
        subtitle: `¥${product.price}`,
        image: product.images[0]?.url,
      })
    })

    // 添加分类建议
    categories.forEach(category => {
      suggestions.push({
        type: 'category' as const,
        item: category,
        label: category.name,
        subtitle: '分类',
        image: category.image,
      })
    })

    // 添加关键词建议
    keywords.forEach(keyword => {
      suggestions.push({
        type: 'keyword' as const,
        item: keyword,
        label: keyword,
        subtitle: '搜索',
      })
    })

    return suggestions
  }, [searchState.results])

  // 检查是否有搜索结果
  const hasResults = useCallback(() => {
    const { products, categories, keywords } = searchState.results
    return products.length > 0 || categories.length > 0 || keywords.length > 0
  }, [searchState.results])

  return {
    // 状态
    query: searchState.query,
    results: searchState.results,
    loading: searchState.loading,
    error: searchState.error,
    isOpen: searchState.isOpen,
    searchHistory,

    // 操作方法
    setQuery,
    openSearch,
    closeSearch,
    clearSearch,
    selectResult,
    removeFromHistory,
    clearHistory,

    // 辅助方法
    getPopularSearches,
    getSuggestions,
    hasResults,
  }
}

/**
 * 搜索历史管理 Hook
 */
export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([])

  // 添加搜索历史
  const addToHistory = useCallback((term: string) => {
    if (!term.trim()) return

    const newHistory = [term, ...history.filter(item => item !== term)].slice(0, 10)
    setHistory(newHistory)

    try {
      localStorage.setItem('leco_search_history', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Failed to save search history:', error)
    }
  }, [history])

  // 删除历史项
  const removeFromHistory = useCallback((term: string) => {
    const newHistory = history.filter(item => item !== term)
    setHistory(newHistory)

    try {
      localStorage.setItem('leco_search_history', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Failed to update search history:', error)
    }
  }, [history])

  // 清空历史
  const clearHistory = useCallback(() => {
    setHistory([])

    try {
      localStorage.removeItem('leco_search_history')
    } catch (error) {
      console.error('Failed to clear search history:', error)
    }
  }, [])

  // 加载历史
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('leco_search_history')
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory)
        }
      }
    } catch (error) {
      console.error('Failed to load search history:', error)
    }
  }, [])

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  }
}