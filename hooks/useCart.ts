// 购物车相关 Hook

import { useState, useCallback, useEffect } from 'react'
import { CartItem, Product } from '@/types'
import { CartApiResponse, AddToCartRequest } from '@/types/api'
import { useApiPost, useApiPut, useApiDelete } from './useApi'
import { API_ENDPOINTS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants'
import { cartStorage } from '@/utils/storage'

interface CartState {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  count: number
  currency: string
}

/**
 * 购物车 Hook
 */
export default function useCart() {
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    count: 0,
    currency: 'CNY',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 添加到购物车
  const addToCart = useApiPost<AddToCartRequest, any>(API_ENDPOINTS.CART, {
    onSuccess: (data) => {
      setCart(data.cart)
      cartStorage.setCart(data.cart)
      // 可以在这里显示成功提示
      console.log(SUCCESS_MESSAGES.PRODUCT_ADDED_TO_CART)
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  // 更新购物车商品数量
  const updateCartItem = useApiPut<{ itemId: string; quantity: number }, CartState>(
    API_ENDPOINTS.CART,
    {
      onSuccess: (data) => {
        setCart(data)
        cartStorage.setCart(data)
      },
      onError: (error) => {
        setError(error.message)
      },
    }
  )

  // 删除购物车商品
  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_ENDPOINTS.CART}/${itemId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }

      const data: CartApiResponse = await response.json()
      
      if (data.success) {
        setCart(data.data)
        cartStorage.setCart(data.data)
      } else {
        setError(data.error || 'Failed to remove item')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item')
    } finally {
      setLoading(false)
    }
  }, [])

  // 清空购物车
  const clearCart = useApiDelete<CartState>(API_ENDPOINTS.CART, {
    onSuccess: (data) => {
      setCart(data)
      cartStorage.removeCart()
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  // 获取购物车数据
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(API_ENDPOINTS.CART)
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }

      const data: CartApiResponse = await response.json()
      
      if (data.success) {
        setCart(data.data)
        cartStorage.setCart(data.data)
      } else {
        setError(data.error || 'Failed to fetch cart')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart')
      
      // 尝试从本地存储恢复购物车数据
      const localCart = cartStorage.getCart()
      if (localCart) {
        setCart(localCart)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // 增加商品数量
  const increaseQuantity = useCallback((itemId: string) => {
    const item = cart.items.find(item => item.id === itemId)
    if (item) {
      updateCartItem.execute({
        itemId,
        quantity: item.quantity + 1,
      })
    }
  }, [cart.items, updateCartItem.execute])

  // 减少商品数量
  const decreaseQuantity = useCallback((itemId: string) => {
    const item = cart.items.find(item => item.id === itemId)
    if (item) {
      if (item.quantity > 1) {
        updateCartItem.execute({
          itemId,
          quantity: item.quantity - 1,
        })
      } else {
        removeFromCart(itemId)
      }
    }
  }, [cart.items, updateCartItem.execute, removeFromCart])

  // 检查商品是否在购物车中
  const isInCart = useCallback((productId: string, variantId?: string) => {
    return cart.items.some(item => 
      item.productId === productId && 
      (!variantId || item.variant?.id === variantId)
    )
  }, [cart.items])

  // 获取商品在购物车中的数量
  const getItemQuantity = useCallback((productId: string, variantId?: string) => {
    const item = cart.items.find(item => 
      item.productId === productId && 
      (!variantId || item.variant?.id === variantId)
    )
    return item?.quantity || 0
  }, [cart.items])

  // 计算购物车摘要
  const getCartSummary = useCallback(() => {
    return {
      itemCount: cart.count,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total,
      currency: cart.currency,
      isEmpty: cart.items.length === 0,
      freeShippingThreshold: 500,
      needsForFreeShipping: Math.max(0, 500 - cart.subtotal),
    }
  }, [cart])

  // 验证购物车商品库存
  const validateCartItems = useCallback(async () => {
    const invalidItems: string[] = []
    
    for (const item of cart.items) {
      // 这里应该调用 API 检查库存
      // 模拟库存检查
      if (item.product.stock < item.quantity) {
        invalidItems.push(item.id)
      }
    }

    return {
      isValid: invalidItems.length === 0,
      invalidItems,
    }
  }, [cart.items])

  // 应用优惠券
  const applyCoupon = useCallback(async (couponCode: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_ENDPOINTS.CART}/coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode }),
      })

      if (!response.ok) {
        throw new Error('Failed to apply coupon')
      }

      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
        return { success: true, discount: data.discount }
      } else {
        setError(data.error || 'Invalid coupon code')
        return { success: false, error: data.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply coupon'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // 移除优惠券
  const removeCoupon = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_ENDPOINTS.CART}/coupon`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to remove coupon')
      }

      const data = await response.json()
      
      if (data.success) {
        setCart(data.data)
      } else {
        setError(data.error || 'Failed to remove coupon')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove coupon')
    } finally {
      setLoading(false)
    }
  }, [])

  // 初始化时从本地存储恢复购物车数据
  useEffect(() => {
    const localCart = cartStorage.getCart()
    if (localCart) {
      setCart(localCart)
    } else {
      fetchCart()
    }
  }, [fetchCart])

  // 监听存储变化（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'leco_cart' && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue)
          setCart(newCart.data)
        } catch (error) {
          console.error('Failed to parse cart from storage:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return {
    // 状态
    cart,
    loading: loading || addToCart.loading || updateCartItem.loading || clearCart.loading,
    error: error || addToCart.error?.message || updateCartItem.error?.message || clearCart.error?.message,

    // 操作方法
    addToCart: addToCart.execute,
    updateCartItem: updateCartItem.execute,
    removeFromCart,
    clearCart: clearCart.execute,
    increaseQuantity,
    decreaseQuantity,
    fetchCart,

    // 查询方法
    isInCart,
    getItemQuantity,
    getCartSummary,
    validateCartItems,

    // 优惠券相关
    applyCoupon,
    removeCoupon,
  }
}