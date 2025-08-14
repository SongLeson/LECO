'use client'

import { useState } from 'react'

export default function DebugRenderPage() {
  const [testData] = useState({
    // 模拟可能导致问题的数据结构
    category: {
      id: 'footwear',
      name: '运动鞋',
      slug: 'footwear',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    variant: {
      id: '1-v1',
      name: '尺码',
      value: '42',
      stock: 10,
    },
    product: {
      id: 'test-1',
      name: 'Test Product',
      category: {
        id: 'footwear',
        name: '运动鞋',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      }
    }
  })

  return (
    <div className="min-h-screen bg-leco-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-leco-electric-blue">渲染调试页面</h1>
        
        <div className="space-y-8">
          {/* 安全渲染测试 */}
          <div className="bg-leco-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">安全渲染测试</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">✅ 安全渲染 - 字符串</h3>
                <p>产品名称: {testData.product.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">✅ 安全渲染 - 对象属性</h3>
                <p>分类名称: {testData.category.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">✅ 安全渲染 - 条件渲染</h3>
                <p>变体: {testData.variant ? `${testData.variant.name}: ${testData.variant.value}` : '无'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">⚠️ 潜在危险 - 直接渲染对象（已注释）</h3>
                <p>分类对象: {/* {testData.category} */} [已注释防止错误]</p>
              </div>
            </div>
          </div>

          {/* 数据结构展示 */}
          <div className="bg-leco-carbon p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">数据结构</h2>
            <pre className="text-xs text-leco-silver overflow-auto">
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>

          {/* 类型检查测试 */}
          <div className="bg-leco-gray p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">类型检查测试</h2>
            
            <div className="space-y-2">
              <p>category类型: {typeof testData.category}</p>
              <p>category.name类型: {typeof testData.category.name}</p>
              <p>variant类型: {typeof testData.variant}</p>
              <p>product.name类型: {typeof testData.product.name}</p>
            </div>
          </div>

          {/* 渲染函数测试 */}
          <div className="bg-leco-carbon p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">渲染函数测试</h2>
            
            <div className="space-y-2">
              <p>安全分类渲染: {
                typeof testData.category === 'string' 
                  ? testData.category 
                  : testData.category?.name || '未分类'
              }</p>
              
              <p>安全变体渲染: {
                testData.variant 
                  ? `${testData.variant.name}: ${testData.variant.value}`
                  : '无变体'
              }</p>
            </div>
          </div>

          {/* 错误模拟测试 */}
          <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-300">错误模拟测试</h2>
            <p className="text-red-200">以下代码会导致 &quot;Objects are not valid as a React child&quot; 错误：</p>
            <code className="block mt-2 p-2 bg-black rounded text-red-300">
              {`<p>{testData.category}</p> // ❌ 直接渲染对象`}
            </code>
            <code className="block mt-2 p-2 bg-black rounded text-green-300">
              {`<p>{testData.category.name}</p> // ✅ 渲染对象属性`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
