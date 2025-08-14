// 搜索框组件

'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SearchBoxProps } from '@/types/components'
import useSearch from '@/hooks/useSearch'
import { formatPrice } from '@/utils/format'

const SearchBox: React.FC<SearchBoxProps> = ({
  isOpen,
  onClose,
  onSearch,
  placeholder = '搜索产品、品牌或分类...',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const {
    query,
    results,
    loading,
    error,
    searchHistory,
    setQuery,
    selectResult,
    removeFromHistory,
    clearHistory,
    getSuggestions,
    hasResults,
    getPopularSearches,
  } = useSearch({
    onSearch,
    onSelect: (item, type) => {
      if (type === 'product') {
        // 跳转到产品详情页
        window.location.href = `/products/${item.id}`
      } else if (type === 'category') {
        // 跳转到分类页面
        window.location.href = `/products?category=${item.slug}`
      } else if (type === 'keyword') {
        // 执行搜索
        window.location.href = `/search?q=${encodeURIComponent(item)}`
      }
    },
  })

  const suggestions = getSuggestions()
  const popularSearches = getPopularSearches()

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const suggestion = suggestions[selectedIndex]
          selectResult(suggestion.item, suggestion.type)
        } else if (query.trim()) {
          handleSubmit(e)
        }
        break
    }
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion: any) => {
    selectResult(suggestion.item, suggestion.type)
  }

  // 处理历史搜索点击
  const handleHistoryClick = (term: string) => {
    setQuery(term)
    onSearch?.(term)
    window.location.href = `/search?q=${encodeURIComponent(term)}`
  }

  // 处理热门搜索点击
  const handlePopularClick = (term: string) => {
    setQuery(term)
    onSearch?.(term)
    window.location.href = `/search?q=${encodeURIComponent(term)}`
  }

  // 自动聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 ${className}`}>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 搜索容器 */}
      <div className="fixed top-0 left-0 right-0 bg-leco-black/95 backdrop-blur-md border-b border-leco-gray/20">
        <div className="max-w-4xl mx-auto p-6">
          {/* 搜索表单 */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-leco-gray/50 border border-leco-dark-silver/30 rounded-lg px-12 py-4 text-white placeholder-leco-silver focus:outline-none focus:border-leco-electric-blue focus:ring-2 focus:ring-leco-electric-blue/20 transition-all duration-200"
              />
              
              {/* 搜索图标 */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-leco-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* 清空按钮 */}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-leco-silver hover:text-white transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-leco-silver hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 加载指示器 */}
            {loading && (
              <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-leco-electric-blue border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </form>

          {/* 搜索结果 */}
          <div className="mt-6 max-h-96 overflow-y-auto">
            {error && (
              <div className="text-red-400 text-sm mb-4 p-3 bg-red-400/10 rounded-lg">
                {error}
              </div>
            )}

            {query && hasResults() && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-leco-silver mb-3">搜索建议</h3>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${index}`}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-left ${
                      selectedIndex === index
                        ? 'bg-leco-electric-blue/20 text-leco-electric-blue'
                        : 'hover:bg-leco-gray/30 text-white'
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {/* 图标或图片 */}
                    <div className="flex-shrink-0 w-10 h-10 bg-leco-gray rounded-lg flex items-center justify-center overflow-hidden">
                      {suggestion.image ? (
                        <img 
                          src={suggestion.image} 
                          alt={suggestion.label}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-5 h-5 text-leco-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {suggestion.type === 'product' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          )}
                          {suggestion.type === 'category' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          )}
                          {suggestion.type === 'keyword' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          )}
                        </svg>
                      )}
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{suggestion.label}</p>
                      <p className="text-sm text-leco-silver truncate">{suggestion.subtitle}</p>
                    </div>

                    {/* 类型标识 */}
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.type === 'product' ? 'bg-leco-energy-orange/20 text-leco-energy-orange' :
                        suggestion.type === 'category' ? 'bg-leco-plasma-purple/20 text-leco-plasma-purple' :
                        'bg-leco-electric-blue/20 text-leco-electric-blue'
                      }`}>
                        {suggestion.type === 'product' ? '商品' :
                         suggestion.type === 'category' ? '分类' : '搜索'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 搜索历史 */}
            {!query && searchHistory.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-leco-silver">最近搜索</h3>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-leco-silver hover:text-white transition-colors duration-200"
                  >
                    清空
                  </button>
                </div>
                <div className="space-y-1">
                  {searchHistory.map((term, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleHistoryClick(term)}
                        className="flex-1 flex items-center space-x-3 p-2 rounded-lg hover:bg-leco-gray/30 transition-colors duration-200 text-left"
                      >
                        <svg className="w-4 h-4 text-leco-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white">{term}</span>
                      </button>
                      <button
                        onClick={() => removeFromHistory(term)}
                        className="p-1 text-leco-silver hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 热门搜索 */}
            {!query && !hasResults() && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-leco-silver">热门搜索</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularClick(term)}
                      className="px-3 py-2 bg-leco-gray/30 hover:bg-leco-electric-blue/20 hover:text-leco-electric-blue text-white text-sm rounded-full transition-colors duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 无结果提示 */}
            {query && !loading && !hasResults() && !error && (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-leco-silver mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-leco-silver">没有找到相关结果</p>
                <p className="text-sm text-leco-dark-silver mt-1">试试其他关键词或浏览热门商品</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox