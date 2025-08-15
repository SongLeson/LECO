// 购物车 API 路由

import { NextRequest, NextResponse } from 'next/server'
import { CartApiResponse, AddToCartRequest, AddToCartResponse } from '@/types/api'
import { CartItem, Product } from '@/types'

// 模拟购物车存储（实际项目中应该使用数据库）
let mockCart: CartItem[] = [
  // 添加一些初始商品用于演示
  {
    id: 'cart-demo-1',
    productId: '1',
    product: {
      id: '1',
      name: 'LECO Alpine Summit Boots',
      description: '专业登山靴，专为极限户外环境设计。',
      price: 1299,
      originalPrice: 1899,
      currency: 'CNY',
      images: [
        {
          id: '1-1',
          url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'LECO Alpine Summit Boots',
          width: 800,
          height: 600,
          isPrimary: true,
        },
      ],
      variants: [
        {
          id: '1-v1',
          name: '尺码',
          value: '42',
          stock: 10,
          sku: 'LECO-ASB-42',
        },
      ],
      category: {
        id: 'footwear',
        name: '户外鞋靴',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      tags: ['EXTREME', 'WATERPROOF', 'NEW'],
      specifications: {
        '材质': 'Gore-Tex + Vibram橡胶',
        '防水等级': 'IPX8',
      },
      stock: 25,
      rating: 4.9,
      reviewCount: 89,
      isNew: true,
      isHot: true,
      isLimited: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    quantity: 1,
    variant: {
      id: '1-v1',
      name: '尺码',
      value: '42',
      stock: 10,
      sku: 'LECO-ASB-42',
    },
    addedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'cart-demo-2',
    productId: '2',
    product: {
      id: '2',
      name: 'LECO Trail Runner Elite',
      description: '专业越野跑鞋，轻量化设计。',
      price: 899,
      originalPrice: 1299,
      currency: 'CNY',
      images: [
        {
          id: '2-1',
          url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'LECO Trail Runner Elite',
          width: 800,
          height: 600,
          isPrimary: true,
        },
      ],
      variants: [
        {
          id: '2-v1',
          name: '尺码',
          value: '41',
          stock: 15,
          sku: 'LECO-TRE-41',
        },
      ],
      category: {
        id: 'footwear',
        name: '户外鞋靴',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      tags: ['LIGHTWEIGHT', 'TRAIL'],
      specifications: {
        '材质': '合成纤维 + 橡胶',
        '重量': '280g (单只)',
      },
      stock: 30,
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      isHot: true,
      isLimited: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    quantity: 2,
    variant: {
      id: '2-v1',
      name: '尺码',
      value: '41',
      stock: 15,
      sku: 'LECO-TRE-41',
    },
    addedAt: '2024-01-15T11:00:00Z',
  },
]

/**
 * 获取购物车数据
 */
export async function GET(request: NextRequest): Promise<NextResponse<CartApiResponse>> {
  try {
    // 计算购物车总计
    const subtotal = mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.1 // 10% 税率
    const shipping = subtotal > 500 ? 0 : 50 // 满500免运费
    const total = subtotal + tax + shipping
    const count = mockCart.reduce((sum, item) => sum + item.quantity, 0)

    const response: CartApiResponse = {
      data: {
        items: mockCart,
        total,
        subtotal,
        tax,
        shipping,
        count,
        currency: 'CNY',
      },
      success: true,
      message: 'Cart data retrieved successfully',
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      },
    })

  } catch (error) {
    console.error('Cart GET API error:', error)

    const errorResponse: CartApiResponse = {
      data: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        count: 0,
        currency: 'CNY',
      },
      success: false,
      error: 'Failed to retrieve cart data',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

/**
 * 添加商品到购物车
 */
export async function POST(request: NextRequest): Promise<NextResponse<AddToCartResponse>> {
  try {
    const body: AddToCartRequest = await request.json()
    const { productId, quantity, variantId } = body

    // 验证请求数据
    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json({
        data: null,
        success: false,
        error: 'Invalid request data',
      }, { status: 400 })
    }

    // 模拟获取产品数据（实际项目中应该从数据库获取）
    const mockProduct: Product = {
      id: productId,
      name: 'LECO Alpine Summit Boots',
      description: '专业登山靴，专为极限户外环境设计。采用防水透气材料和高强度鞋底。',
      price: 1299,
      originalPrice: 1899,
      currency: 'CNY',
      images: [
        {
          id: '1-1',
          url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'LECO Alpine Summit Boots 主图',
          width: 800,
          height: 600,
          isPrimary: true,
        },
        {
          id: '1-2',
          url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt: 'LECO Alpine Summit Boots 侧面',
          width: 800,
          height: 600,
          isPrimary: false,
        },
      ],
      variants: [
        {
          id: '1-v1',
          name: '尺码',
          value: '42',
          stock: 10,
          sku: 'LECO-ASB-42',
        },
        {
          id: '1-v2',
          name: '尺码',
          value: '43',
          stock: 8,
          sku: 'LECO-ASB-43',
        },
      ],
      category: {
        id: 'footwear',
        name: '户外鞋靴',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      tags: ['EXTREME', 'WATERPROOF', 'NEW'],
      specifications: {
        '材质': 'Gore-Tex + Vibram橡胶',
        '鞋底': 'Vibram高性能橡胶大底',
        '防水等级': 'IPX8',
        '温度范围': '-40°C 至 +20°C',
      },
      stock: 15,
      rating: 4.8,
      reviews: 156,
      isNew: false,
      isHot: true,
      isLimited: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    }

    // 检查库存
    if (mockProduct.stock < quantity) {
      return NextResponse.json({
        data: null,
        success: false,
        error: 'Insufficient stock',
      }, { status: 400 })
    }

    // 查找是否已存在相同商品
    const existingItemIndex = mockCart.findIndex(item => 
      item.productId === productId && 
      (!variantId || item.variant?.id === variantId)
    )

    let cartItem: CartItem

    if (existingItemIndex >= 0) {
      // 更新现有商品数量
      mockCart[existingItemIndex].quantity += quantity
      cartItem = mockCart[existingItemIndex]
    } else {
      // 添加新商品
      const variant = variantId ? mockProduct.variants.find(v => v.id === variantId) : undefined
      
      cartItem = {
        id: `cart-${Date.now()}`,
        productId,
        product: mockProduct,
        quantity,
        variant,
        addedAt: new Date().toISOString(),
      }

      mockCart.push(cartItem)
    }

    // 重新计算购物车总计
    const subtotal = mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.1
    const shipping = subtotal > 500 ? 0 : 50
    const total = subtotal + tax + shipping
    const count = mockCart.reduce((sum, item) => sum + item.quantity, 0)

    const response: AddToCartResponse = {
      data: {
        item: cartItem,
        cart: {
          items: mockCart,
          total,
          subtotal,
          tax,
          shipping,
          count,
          currency: 'CNY',
        },
      },
      success: true,
      message: 'Product added to cart successfully',
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Cart POST API error:', error)

    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to add product to cart',
    }, { status: 500 })
  }
}

/**
 * 更新购物车商品
 */
export async function PUT(request: NextRequest): Promise<NextResponse<CartApiResponse>> {
  try {
    const body = await request.json()
    const { itemId, quantity } = body

    if (!itemId || quantity < 0) {
      return NextResponse.json({
        data: null,
        success: false,
        error: 'Invalid request data',
      }, { status: 400 })
    }

    const itemIndex = mockCart.findIndex(item => item.id === itemId)

    if (itemIndex === -1) {
      return NextResponse.json({
        data: null,
        success: false,
        error: 'Cart item not found',
      }, { status: 404 })
    }

    if (quantity === 0) {
      // 删除商品
      mockCart.splice(itemIndex, 1)
    } else {
      // 更新数量
      mockCart[itemIndex].quantity = quantity
    }

    // 重新计算购物车总计
    const subtotal = mockCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const tax = subtotal * 0.1
    const shipping = subtotal > 500 ? 0 : 50
    const total = subtotal + tax + shipping
    const count = mockCart.reduce((sum, item) => sum + item.quantity, 0)

    const response: CartApiResponse = {
      data: {
        items: mockCart,
        total,
        subtotal,
        tax,
        shipping,
        count,
        currency: 'CNY',
      },
      success: true,
      message: 'Cart updated successfully',
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Cart PUT API error:', error)

    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to update cart',
    }, { status: 500 })
  }
}

/**
 * 清空购物车
 */
export async function DELETE(request: NextRequest): Promise<NextResponse<CartApiResponse>> {
  try {
    mockCart = []

    const response: CartApiResponse = {
      data: {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        count: 0,
        currency: 'CNY',
      },
      success: true,
      message: 'Cart cleared successfully',
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Cart DELETE API error:', error)

    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to clear cart',
    }, { status: 500 })
  }
}