// 购物车 API 路由

import { NextRequest, NextResponse } from 'next/server'
import { CartApiResponse, AddToCartRequest, AddToCartResponse } from '@/types/api'
import { CartItem, Product } from '@/types'

// 模拟购物车存储（实际项目中应该使用数据库）
let mockCart: CartItem[] = []

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
      name: 'LECO Air Max Pro',
      description: '革命性的运动鞋，采用最新的气垫技术。',
      price: 899,
      originalPrice: 1299,
      currency: 'CNY',
      images: [
        {
          id: '1-1',
          url: '/images/products/shoe-1-main.jpg',
          alt: 'LECO Air Max Pro 主图',
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
          sku: 'LECO-AMP-42',
        },
      ],
      category: {
        id: 'footwear',
        name: '运动鞋',
        slug: 'footwear',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      tags: ['HOT', 'SALE'],
      specifications: {
        '材质': '合成革 + 网布',
        '鞋底': 'EVA + 橡胶',
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