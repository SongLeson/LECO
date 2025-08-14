'use client'

import { useState } from 'react'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'
import { getCategoryName, getVariantInfo } from '@/utils/safeRender'

export default function TestCartPage() {
  const { cart, addToCart, removeFromCart, getCartSummary, loading, error } = useCart()
  const [testProductId, setTestProductId] = useState('test-product-1')
  const [quantity, setQuantity] = useState(1)

  const summary = getCartSummary()

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: testProductId,
        quantity: quantity,
        variantId: '1-v1'
      })
      console.log('Added to cart successfully')
    } catch (err) {
      console.error('Failed to add to cart:', err)
    }
  }

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId)
  }

  return (
    <div className="min-h-screen bg-leco-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-leco-electric-blue">购物车测试页面</h1>
        
        {/* 错误显示 */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-6">
            错误: {error}
          </div>
        )}

        {/* 添加商品测试 */}
        <div className="bg-leco-gray p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">添加商品到购物车</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">商品ID</label>
              <input
                type="text"
                value={testProductId}
                onChange={(e) => setTestProductId(e.target.value)}
                className="bg-leco-carbon border border-leco-carbon rounded px-3 py-2 text-white"
                placeholder="输入商品ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">数量</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                className="bg-leco-carbon border border-leco-carbon rounded px-3 py-2 text-white w-20"
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="bg-leco-electric-blue text-leco-black px-6 py-2 rounded font-semibold hover:bg-leco-neon-blue transition-colors disabled:opacity-50"
            >
              {loading ? '添加中...' : '添加到购物车'}
            </button>
          </div>
        </div>

        {/* 购物车内容 */}
        <div className="bg-leco-gray p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">购物车内容</h2>
          
          {summary.isEmpty ? (
            <p className="text-leco-silver">购物车是空的</p>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-leco-carbon p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-leco-silver">
                        分类: {getCategoryName(item.product.category)}
                      </p>
                      {item.variant && (
                        <p className="text-sm text-leco-silver">
                          {getVariantInfo(item.variant)}
                        </p>
                      )}
                      <p className="text-leco-electric-blue font-semibold">
                        {formatPrice(item.product.price)} x {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      移除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 购物车摘要 */}
        <div className="bg-leco-gray p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">购物车摘要</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>商品数量:</span>
              <span>{summary.totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>小计:</span>
              <span>{formatPrice(summary.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>税费:</span>
              <span>{formatPrice(summary.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>运费:</span>
              <span>{formatPrice(summary.shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-leco-carbon pt-2">
              <span>总计:</span>
              <span className="text-leco-electric-blue">{formatPrice(summary.total)}</span>
            </div>
          </div>
        </div>

        {/* 调试信息 */}
        <div className="bg-leco-carbon p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">调试信息</h2>
          <pre className="text-xs text-leco-silver overflow-auto">
            {JSON.stringify({ cart, summary, loading, error }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
