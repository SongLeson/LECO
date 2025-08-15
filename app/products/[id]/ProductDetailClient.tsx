'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import useCart from '@/hooks/useCart'
import { formatPrice } from '@/utils/format'

// Mock产品数据 - 户外极限运动装备
const mockProduct = {
  id: '1',
  name: 'LECO Alpine Summit Boots',
  description: '专业登山靴，专为极限户外环境设计。采用防水透气材料和高强度鞋底，在最恶劣的山地环境中提供卓越的保护和抓地力。每一步都是对极限的挑战。',
  price: 1299,
  originalPrice: 1899,
  images: [
    { url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'LECO Alpine Summit Boots' },
    { url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'LECO Alpine Summit Boots 侧面' },
    { url: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'LECO Alpine Summit Boots 底部' },
  ],
  category: 'footwear',
  tags: ['EXTREME', 'WATERPROOF', 'NEW'],
  stock: 25,
  rating: 4.9,
  reviewCount: 89,
  variants: [
    { id: 'size-40', name: '尺码', value: '40', stock: 3 },
    { id: 'size-41', name: '尺码', value: '41', stock: 5 },
    { id: 'size-42', name: '尺码', value: '42', stock: 8 },
    { id: 'size-43', name: '尺码', value: '43', stock: 6 },
    { id: 'size-44', name: '尺码', value: '44', stock: 3 },
  ],
  colors: [
    { name: '极地黑', value: '#000000', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: '冰川蓝', value: '#00E5FF', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { name: '岩石灰', value: '#8B8B8B', image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ],
  features: [
    '防水透气Gore-Tex材料，全天候保护',
    'Vibram高性能橡胶大底，极致抓地力',
    '碳纤维中底板，提供卓越支撑',
    '保温隔热设计，适应极地环境',
    '快速系带系统，便于穿脱调节',
    '防撞鞋头设计，保护足部安全',
  ],
  specifications: {
    '重量': '680g (单只)',
    '材质': 'Gore-Tex + Vibram橡胶 + 碳纤维',
    '适用场景': '登山、徒步、极地探险',
    '防水等级': 'IPX8',
    '温度范围': '-40°C 至 +20°C',
    '保修期': '2年',
  }
}

interface ProductDetailClientProps {
  productId: string
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
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
              className="aspect-square bg-leco-gray rounded-2xl overflow-hidden relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={product.images[activeImageIndex]?.url || product.images[0].url}
                alt={product.images[activeImageIndex]?.alt || product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* 悬浮效果 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-leco-electric-blue/10 via-transparent to-leco-plasma-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(0,229,255,0.1) 0%, transparent 50%, rgba(139,0,255,0.1) 100%)',
                    'linear-gradient(45deg, rgba(139,0,255,0.1) 0%, transparent 50%, rgba(255,107,0,0.1) 100%)',
                    'linear-gradient(45deg, rgba(255,107,0,0.1) 0%, transparent 50%, rgba(0,229,255,0.1) 100%)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* 产品标签 */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-leco-energy-orange text-leco-black text-xs font-bold rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 缩略图 */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 relative ${
                    activeImageIndex === index
                      ? 'border-leco-electric-blue shadow-lg shadow-leco-electric-blue/30'
                      : 'border-leco-carbon hover:border-leco-electric-blue/50'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                  {/* 选中指示器 */}
                  {activeImageIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-leco-electric-blue/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-3 h-3 bg-leco-electric-blue rounded-full" />
                    </motion.div>
                  )}
                </motion.button>
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
