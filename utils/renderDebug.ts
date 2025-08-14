// 渲染调试工具

/**
 * 检查值是否可以安全渲染
 */
export const checkRenderSafety = (value: any, context: string = 'unknown'): boolean => {
  if (value === null || value === undefined) {
    return true
  }
  
  const type = typeof value
  
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return true
  }
  
  if (type === 'object') {
    // 检查是否是React元素
    if (value.$$typeof) {
      return true
    }
    
    // 检查是否是数组
    if (Array.isArray(value)) {
      return value.every((item, index) => checkRenderSafety(item, `${context}[${index}]`))
    }
    
    // 检查是否是普通对象（可能导致错误）
    if (value.constructor === Object || value.constructor === undefined) {
      console.error(`🚨 Unsafe render detected in ${context}:`, value)
      console.trace('Render stack trace')
      return false
    }
  }
  
  return true
}

/**
 * 安全渲染包装函数
 */
export const safeRenderValue = (value: any, context: string = 'unknown'): any => {
  if (!checkRenderSafety(value, context)) {
    // 如果不安全，尝试提取可渲染的值
    if (typeof value === 'object' && value !== null) {
      if (value.name && typeof value.name === 'string') {
        return value.name
      }
      if (value.title && typeof value.title === 'string') {
        return value.title
      }
      if (value.label && typeof value.label === 'string') {
        return value.label
      }
      return '[Object]'
    }
  }
  
  return value
}

/**
 * 开发环境下的渲染监控
 */
export const enableRenderMonitoring = () => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  
  // 拦截React的createElement
  const originalCreateElement = React.createElement
  React.createElement = function(type: any, props: any, ...children: any[]) {
    // 检查props中的值
    if (props) {
      Object.keys(props).forEach(key => {
        if (!checkRenderSafety(props[key], `props.${key}`)) {
          console.error(`Unsafe prop detected: ${key}`, props[key])
        }
      })
    }
    
    // 检查children
    children.forEach((child, index) => {
      if (!checkRenderSafety(child, `children[${index}]`)) {
        console.error(`Unsafe child detected at index ${index}:`, child)
      }
    })
    
    return originalCreateElement.apply(this, [type, props, ...children])
  }
}

/**
 * 查找可能导致渲染错误的对象
 */
export const findUnsafeRenderObjects = (obj: any, path: string = 'root'): string[] => {
  const unsafeObjects: string[] = []
  
  if (typeof obj !== 'object' || obj === null) {
    return unsafeObjects
  }
  
  // 检查当前对象是否可能导致渲染错误
  if (obj.constructor === Object && obj.id && obj.name && obj.slug) {
    unsafeObjects.push(`${path}: ${JSON.stringify(obj)}`)
  }
  
  // 递归检查子对象
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (typeof value === 'object' && value !== null) {
      unsafeObjects.push(...findUnsafeRenderObjects(value, `${path}.${key}`))
    }
  })
  
  return unsafeObjects
}

/**
 * 调试购物车数据
 */
export const debugCartData = (cart: any) => {
  console.group('🛒 Cart Data Debug')
  
  if (cart && cart.items) {
    cart.items.forEach((item: any, index: number) => {
      console.group(`Item ${index}`)
      console.log('Product:', item.product)
      console.log('Category type:', typeof item.product.category)
      console.log('Category value:', item.product.category)
      
      if (item.variant) {
        console.log('Variant type:', typeof item.variant)
        console.log('Variant value:', item.variant)
      }
      
      // 查找不安全的对象
      const unsafeObjects = findUnsafeRenderObjects(item, `item[${index}]`)
      if (unsafeObjects.length > 0) {
        console.error('Unsafe objects found:', unsafeObjects)
      }
      
      console.groupEnd()
    })
  }
  
  console.groupEnd()
}

// 全局导出React（如果需要）
declare global {
  var React: any
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.React = require('react')
}
