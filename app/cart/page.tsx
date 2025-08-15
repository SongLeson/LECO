'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'
import { getCategoryName, getVariantInfo } from '@/utils/safeRender'
import { SafeText } from '@/components/RenderSafeWrapper'
import { debugCartData } from '@/utils/renderDebug'

// 安全渲染函数
const safeString = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return value.toString()
  if (typeof value === 'object' && value.name) return value.name
  return String(value)
}

export default function CartPage() {
  const { 
    cart, 
    loading, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartSummary,
    clearCart 
  } = useCart()
  
  const summary = getCartSummary()

  // 调试：检查购物车数据
  if (process.env.NODE_ENV === 'development') {
    console.log('=== CART DEBUG ===')
    console.log('Cart:', cart)
    cart.items.forEach((item, index) => {
      console.log(`Item ${index}:`, {
        id: item.id,
        productName: item.product.name,
        productNameType: typeof item.product.name,
        category: item.product.category,
        categoryType: typeof item.product.category,
        variant: item.variant,
        variantType: typeof item.variant
      })

      // 检查是否有不安全的对象
      const checkUnsafe = (obj: any, path: string) => {
        if (obj && typeof obj === 'object' && obj.constructor === Object) {
          if (obj.id && obj.name && obj.slug && obj.createdAt && obj.updatedAt) {
            console.error(`🚨 UNSAFE OBJECT at ${path}:`, obj)
          }
        }
      }

      checkUnsafe(item.product.category, `item[${index}].product.category`)
      checkUnsafe(item.variant, `item[${index}].variant`)
    })
    console.log('=== END CART DEBUG ===')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-leco-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-leco-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-leco-silver">加载购物车...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-leco-black pt-24 pb-12">
      <div className="sport-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 rounded-full bg-leco-gray hover:bg-leco-electric-blue/20 text-leco-electric-blue transition-colors duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl font-display font-bold text-white">购物车</h1>
          </div>
          
          {!summary.isEmpty && (
            <button
              onClick={clearCart}
              className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
            >
              清空购物车
            </button>
          )}
        </div>

        {summary.isEmpty ? (
          // 空购物车
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 bg-leco-gray rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={64} className="text-leco-silver" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">购物车是空的</h2>
            <p className="text-leco-silver mb-8">快去挑选心仪的商品吧</p>
            <Link
              href="/#products"
              className="inline-block px-8 py-4 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-bold rounded-lg transition-colors duration-200"
            >
              去购物
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 购物车商品列表 */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => {
                // 安全提取数据
                const productName = safeString(item.product.name)
                const categoryName = getCategoryName(item.product.category)
                const variantInfo = getVariantInfo(item.variant)
                const productPrice = item.product.price || 0
                const originalPrice = item.product.originalPrice
                const quantity = item.quantity || 1
                const imageUrl = item.product.images?.[0]?.url || '/images/placeholder.jpg'

                return (
                  <motion.div
                    key={item.id}
                    className="bg-leco-gray rounded-lg p-6 border border-leco-carbon"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* 商品图片 */}
                      <div className="w-24 h-24 bg-leco-carbon rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={imageUrl || 'https://images.unsplash.com/photo-1551524164-6cf2ac2d8c8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                          alt={productName || '商品图片'}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* 商品信息 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {productName}
                        </h3>
                        <p className="text-leco-silver text-sm">
                          {categoryName}
                        </p>
                        {variantInfo && (
                          <p className="text-leco-silver text-sm">
                            {variantInfo}
                          </p>
                        )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xl font-bold text-leco-electric-blue">
                          {formatPrice(productPrice)}
                        </span>
                        {originalPrice && (
                          <span className="text-sm text-leco-silver line-through">
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 数量控制 */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-white font-semibold min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-leco-silver hover:text-red-400 hover:bg-red-400/10 rounded transition-colors duration-200"
                      title="删除商品"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
                )
              })}
            </div>

            {/* 订单摘要 */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-leco-gray rounded-lg p-6 border border-leco-carbon sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">订单摘要</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-leco-silver">商品数量</span>
                    <span className="text-white">{summary.itemCount} 件</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-leco-silver">小计</span>
                    <span className="text-white">{formatPrice(summary.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-leco-silver">运费</span>
                    <span className="text-white">
                      {summary.shipping > 0 ? formatPrice(summary.shipping) : '免费'}
                    </span>
                  </div>
                  
                  {summary.tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-leco-silver">税费</span>
                      <span className="text-white">{formatPrice(summary.tax)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-leco-carbon pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-white">总计</span>
                      <span className="text-2xl font-bold text-leco-electric-blue">
                        {formatPrice(summary.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 免运费提示 */}
                {summary.needsForFreeShipping > 0 && (
                  <div className="bg-leco-electric-blue/10 border border-leco-electric-blue/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-leco-electric-blue text-center">
                      再购买 <span className="font-bold">{formatPrice(summary.needsForFreeShipping)}</span> 即可免运费
                    </p>
                  </div>
                )}

                {/* 结账按钮 */}
                <Link
                  href="/checkout"
                  className="block w-full bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-bold py-4 px-6 rounded-lg text-center transition-colors duration-200"
                >
                  立即结账
                </Link>

                {/* 继续购物 */}
                <Link
                  href="/#products"
                  className="block w-full mt-4 border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black font-semibold py-4 px-6 rounded-lg text-center transition-colors duration-200"
                >
                  继续购物
                </Link>

                {/* 安全提示 */}
                <div className="flex items-center justify-center space-x-2 mt-6 text-xs text-leco-dark-silver">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>安全结账 · 支持多种支付方式</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
