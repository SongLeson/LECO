'use client'

import { useState } from 'react'

export default function MinimalCartPage() {
  // 模拟可能导致问题的数据
  const [testItem] = useState({
    id: 'test-1',
    product: {
      id: 'product-1',
      name: 'Test Product',
      price: 199,
      category: {
        id: 'footwear',
        name: '运动鞋',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      }
    },
    variant: {
      id: 'variant-1',
      name: '尺码',
      value: '42'
    },
    quantity: 1
  })

  return (
    <div className="min-h-screen bg-leco-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-leco-electric-blue">最小化购物车测试</h1>
        
        <div className="space-y-8">
          {/* 安全渲染测试 */}
          <div className="bg-leco-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">安全渲染测试</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-400">✅ 安全 - 产品名称</h3>
                <p>名称: {testItem.product.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-400">✅ 安全 - 分类名称</h3>
                <p>分类: {testItem.product.category.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-400">✅ 安全 - 条件渲染</h3>
                <p>分类: {typeof testItem.product.category === 'string' ? testItem.product.category : testItem.product.category.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-400">✅ 安全 - 变体信息</h3>
                <p>变体: {testItem.variant ? `${testItem.variant.name}: ${testItem.variant.value}` : '无'}</p>
              </div>
              
              <div className="border border-red-500 p-4 rounded">
                <h3 className="font-semibold text-red-400">⚠️ 危险 - 直接渲染对象（已注释）</h3>
                <p>分类对象: {/* {testItem.product.category} */} [已注释防止错误]</p>
                <p>变体对象: {/* {testItem.variant} */} [已注释防止错误]</p>
              </div>
            </div>
          </div>

          {/* 模拟购物车项目渲染 */}
          <div className="bg-leco-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">模拟购物车项目</h2>
            
            <div className="bg-leco-carbon p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-leco-electric-blue rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">IMG</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{testItem.product.name}</h3>
                  <p className="text-leco-silver text-sm">
                    {testItem.product.category.name}
                  </p>
                  <p className="text-leco-silver text-sm">
                    {testItem.variant.name}: {testItem.variant.value}
                  </p>
                  <p className="text-leco-electric-blue font-semibold">
                    ¥{testItem.product.price} x {testItem.quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 数据结构展示 */}
          <div className="bg-leco-carbon p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">数据结构</h2>
            <pre className="text-xs text-leco-silver overflow-auto">
              {JSON.stringify(testItem, null, 2)}
            </pre>
          </div>

          {/* 类型检查 */}
          <div className="bg-leco-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">类型检查</h2>
            <div className="space-y-2">
              <p>product.category 类型: {typeof testItem.product.category}</p>
              <p>product.category.name 类型: {typeof testItem.product.category.name}</p>
              <p>variant 类型: {typeof testItem.variant}</p>
              <p>variant.name 类型: {typeof testItem.variant.name}</p>
              <p>variant.value 类型: {typeof testItem.variant.value}</p>
            </div>
          </div>

          {/* 错误重现尝试 */}
          <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-300">错误重现测试</h2>
            <p className="text-red-200 mb-4">以下按钮会尝试重现错误（安全的）：</p>
            
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded mr-4"
              onClick={() => {
                console.log('Testing category object:', testItem.product.category)
                console.log('Testing variant object:', testItem.variant)
                
                // 检查是否有任何地方可能直接渲染对象
                const checkObject = (obj: any, name: string) => {
                  console.log(`${name} keys:`, Object.keys(obj))
                  console.log(`${name} has id:`, 'id' in obj)
                  console.log(`${name} has name:`, 'name' in obj)
                  console.log(`${name} has slug:`, 'slug' in obj)
                  console.log(`${name} has createdAt:`, 'createdAt' in obj)
                  console.log(`${name} has updatedAt:`, 'updatedAt' in obj)
                }
                
                checkObject(testItem.product.category, 'category')
                checkObject(testItem.variant, 'variant')
              }}
            >
              检查对象结构
            </button>
            
            <button 
              className="bg-yellow-600 text-white px-4 py-2 rounded"
              onClick={() => {
                // 尝试找出可能导致错误的渲染
                console.error('模拟渲染错误检查')
                console.log('如果直接渲染这些对象会导致错误:')
                console.log('category:', testItem.product.category)
                console.log('variant:', testItem.variant)
              }}
            >
              模拟错误检查
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
