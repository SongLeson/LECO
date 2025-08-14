// 购物车预览组件

'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CartPreviewProps } from '@/types/components'
import { formatPrice } from '@/utils/format'
import { getVariantInfo } from '@/utils/safeRender'
import useCart from '@/hooks/useCart'

const CartPreview: React.FC<CartPreviewProps> = ({
  isOpen,
  onClose,
  onViewCart,
  onCheckout,
  className = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const {
    cart,
    loading,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartSummary,
  } = useCart()

  const summary = getCartSummary()

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // ESC 键关闭下拉菜单
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={`absolute top-full right-0 mt-2 w-96 max-w-[90vw] ${className}`} ref={dropdownRef}>
      <div className="bg-leco-gray/95 backdrop-blur-md rounded-lg shadow-xl border border-leco-dark-silver/20 overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-leco-dark-silver/20">
          <h3 className="text-lg font-semibold text-white">购物车</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-leco-silver">
              {summary.itemCount} 件商品
            </span>
            <button
              onClick={onClose}
              className="p-1 text-leco-silver hover:text-white transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 购物车内容 */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            // 加载状态
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-leco-electric-blue border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-leco-silver">加载中...</span>
            </div>
          ) : summary.isEmpty ? (
            // 空购物车
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-leco-silver mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <p className="text-leco-silver mb-2">购物车是空的</p>
              <p className="text-sm text-leco-dark-silver">快去挑选心仪的商品吧</p>
              <Link
                href="/products"
                className="inline-block mt-4 px-4 py-2 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-medium rounded-lg transition-colors duration-200"
                onClick={onClose}
              >
                去购物
              </Link>
            </div>
          ) : (
            // 购物车商品列表
            <div className="p-4 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 group">
                  {/* 商品图片 */}
                  <div className="flex-shrink-0 w-16 h-16 bg-leco-carbon rounded-lg overflow-hidden">
                    <img
                      src={item.product.images[0]?.url || '/images/placeholder.jpg'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 商品信息 */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="block font-medium text-white hover:text-leco-electric-blue transition-colors duration-200 truncate"
                      onClick={onClose}
                    >
                      {item.product.name}
                    </Link>
                    
                    {item.variant && (
                      <p className="text-sm text-leco-silver">
                        {getVariantInfo(item.variant)}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-leco-electric-blue font-semibold">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-leco-silver line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* 数量控制 */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="text-white font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 删除按钮 */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0 p-1 text-leco-silver hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="删除商品"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部操作区 */}
        {!summary.isEmpty && (
          <div className="border-t border-leco-dark-silver/20 p-4 space-y-4">
            {/* 免运费提示 */}
            {summary.needsForFreeShipping > 0 && (
              <div className="text-sm text-leco-silver text-center">
                再购买 <span className="text-leco-electric-blue font-semibold">
                  {formatPrice(summary.needsForFreeShipping)}
                </span> 即可免运费
              </div>
            )}

            {/* 总计 */}
            <div className="flex items-center justify-between">
              <span className="text-leco-silver">小计：</span>
              <span className="text-xl font-bold text-white">
                {formatPrice(summary.subtotal)}
              </span>
            </div>

            {/* 操作按钮 */}
            <div className="space-y-2">
              <button
                onClick={onCheckout}
                className="w-full bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                立即结账
              </button>
              
              <button
                onClick={onViewCart}
                className="w-full border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                查看购物车
              </button>
            </div>

            {/* 安全提示 */}
            <div className="flex items-center justify-center space-x-2 text-xs text-leco-dark-silver">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>安全结账 · 支持多种支付方式</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPreview