'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'

// Mock产品数据
const mockProduct = {
  id: '1',
  name: 'LECO Speed Runner Pro',
  description: '专业跑步鞋，采用最新科技材料，提供极致的速度体验。这款跑鞋结合了轻量化设计和卓越的缓震性能，让每一步都充满力量。',
  price: 899,
  originalPrice: 1299,
  images: [
    { url: '/images/products/shoe1-1.jpg', alt: 'LECO Speed Runner Pro' },
    { url: '/images/products/shoe1-2.jpg', alt: 'LECO Speed Runner Pro 侧面' },
    { url: '/images/products/shoe1-3.jpg', alt: 'LECO Speed Runner Pro 底部' },
  ],
  category: 'footwear',
  tags: ['NEW', 'HOT'],
  stock: 50,
  rating: 4.8,
  reviewCount: 128,
  variants: [
    { id: 'size-40', name: '尺码', value: '40', stock: 10 },
    { id: 'size-41', name: '尺码', value: '41', stock: 15 },
    { id: 'size-42', name: '尺码', value: '42', stock: 20 },
    { id: 'size-43', name: '尺码', value: '43', stock: 5 },
  ],
  colors: [
    { name: '电蓝', value: '#00E5FF', image: '/images/products/shoe1-blue.jpg' },
    { name: '等离子紫', value: '#8B00FF', image: '/images/products/shoe1-purple.jpg' },
    { name: '能量橙', value: '#FF6B00', image: '/images/products/shoe1-orange.jpg' },
  ],
  features: [
    '轻量化设计，减轻足部负担',
    '高弹性中底，提供卓越缓震',
    '透气网面，保持足部干爽',
    '防滑橡胶大底，增强抓地力',
    '人体工学设计，贴合足型',
  ],
  specifications: {
    '重量': '280g (单只)',
    '材质': '合成纤维 + 橡胶',
    '适用场景': '跑步、训练、日常',
    '保修期': '1年',
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product] = useState(mockProduct) // 在实际应用中，这里会根据ID获取产品数据
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const { addToCart, isInCart, getItemQuantity } = useCart()

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        quantity,
        variantId: selectedVariant.id,
      })
      console.log('商品已添加到购物车')
    } catch (error) {
      console.error('添加到购物车失败:', error)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    console.log('收藏状态已更新')
  }

  return (
    <div className="min-h-screen bg-leco-black pt-24 pb-12">
      <div className="sport-container">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link 
            href="/#products"
            className="inline-flex items-center space-x-2 p-2 rounded-full bg-leco-gray hover:bg-leco-electric-blue/20 text-leco-electric-blue transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>返回产品列表</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 产品图片 */}
          <div className="space-y-4">
            {/* 主图 */}
            <motion.div 
              className="aspect-square bg-leco-gray rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-leco-electric-blue to-leco-plasma-purple flex items-center justify-center">
                <div className="text-6xl font-display font-black text-leco-black">
                  LECO
                </div>
              </div>
            </motion.div>

            {/* 缩略图 */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                    activeImageIndex === index 
                      ? 'border-leco-electric-blue' 
                      : 'border-leco-carbon hover:border-leco-electric-blue/50'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-leco-carbon to-leco-gray flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 产品信息 */}
          <div className="space-y-6">
            {/* 标题和价格 */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-leco-energy-orange text-leco-black text-xs font-bold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl font-display font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-leco-electric-blue">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-leco-silver line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* 评分 */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-leco-energy-orange fill-leco-energy-orange'
                          : 'text-leco-carbon'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-leco-electric-blue font-bold">
                  {product.rating}
                </span>
                <span className="text-leco-silver">
                  ({product.reviewCount} 评价)
                </span>
              </div>
            </div>

            {/* 描述 */}
            <p className="text-leco-silver leading-relaxed">
              {product.description}
            </p>

            {/* 颜色选择 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">颜色</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? 'border-leco-electric-blue scale-110'
                        : 'border-leco-carbon hover:border-leco-electric-blue/50'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
              <p className="text-sm text-leco-silver mt-2">
                已选择: {selectedColor.name}
              </p>
            </div>

            {/* 尺码选择 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">尺码</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200 ${
                      selectedVariant.id === variant.id
                        ? 'border-leco-electric-blue bg-leco-electric-blue text-leco-black'
                        : 'border-leco-carbon text-white hover:border-leco-electric-blue/50'
                    } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => variant.stock > 0 && setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                  >
                    {variant.value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-leco-silver mt-2">
                库存: {selectedVariant.stock} 件
              </p>
            </div>

            {/* 数量选择 */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">数量</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-leco-gray rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span className="text-white font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                    className="w-8 h-8 flex items-center justify-center bg-leco-carbon hover:bg-leco-electric-blue/20 text-white hover:text-leco-electric-blue rounded transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <span className="text-leco-silver">
                  最多可选 {selectedVariant.stock} 件
                </span>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={selectedVariant.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-bold py-4 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                <span>
                  {isInCart(product.id) ? '已在购物车' : '加入购物车'}
                </span>
              </button>
              
              <button
                onClick={handleToggleFavorite}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isFavorite
                    ? 'border-leco-plasma-purple bg-leco-plasma-purple text-leco-black'
                    : 'border-leco-plasma-purple text-leco-plasma-purple hover:bg-leco-plasma-purple hover:text-leco-black'
                }`}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* 产品特性 */}
            <div className="pt-6 border-t border-leco-carbon">
              <h3 className="text-lg font-semibold text-white mb-4">产品特性</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-leco-silver">
                    <div className="w-2 h-2 bg-leco-electric-blue rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
