// 安全渲染工具函数

/**
 * 安全渲染任何值，防止React渲染错误
 */
export const safeRender = (value: any): string => {
  if (value === null || value === undefined) {
    return ''
  }
  
  if (typeof value === 'string') {
    return value
  }
  
  if (typeof value === 'number') {
    return value.toString()
  }
  
  if (typeof value === 'boolean') {
    return value.toString()
  }
  
  // 如果是对象，尝试获取name属性
  if (typeof value === 'object') {
    if (value.name && typeof value.name === 'string') {
      return value.name
    }
    
    if (value.title && typeof value.title === 'string') {
      return value.title
    }
    
    if (value.label && typeof value.label === 'string') {
      return value.label
    }
    
    // 如果是数组，返回长度信息
    if (Array.isArray(value)) {
      return `Array(${value.length})`
    }
    
    // 对于其他对象，返回类型信息而不是直接渲染
    console.warn('Attempting to render object:', value)
    return '[Object]'
  }
  
  return String(value)
}

/**
 * 安全获取分类名称
 */
export const getCategoryName = (category: string | { name?: string } | null | undefined): string => {
  if (!category) {
    return '未分类'
  }
  
  if (typeof category === 'string') {
    return category
  }
  
  if (typeof category === 'object' && category.name) {
    return category.name
  }
  
  console.warn('Invalid category format:', category)
  return '未分类'
}

/**
 * 安全获取变体信息
 */
export const getVariantInfo = (variant: any): string => {
  if (!variant) {
    return ''
  }
  
  if (typeof variant === 'string') {
    return variant
  }
  
  if (typeof variant === 'object') {
    const name = variant.name || ''
    const value = variant.value || ''
    
    if (name && value) {
      return `${name}: ${value}`
    }
    
    if (name) {
      return name
    }
    
    if (value) {
      return value
    }
  }
  
  return ''
}

/**
 * 调试函数：检查值是否可以安全渲染
 */
export const isRenderSafe = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true
  }
  
  const type = typeof value
  
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return true
  }
  
  if (type === 'object') {
    console.warn('Potentially unsafe render value:', value)
    return false
  }
  
  return true
}

/**
 * 开发环境下的渲染检查
 */
export const devRenderCheck = (value: any, context: string = 'unknown') => {
  if (process.env.NODE_ENV === 'development') {
    if (!isRenderSafe(value)) {
      console.error(`Unsafe render detected in ${context}:`, value)
      console.trace('Render stack trace')
    }
  }
}
