'use client'

import React from 'react'

interface RenderSafeWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  context?: string
}

/**
 * 安全渲染包装器，防止对象直接渲染错误
 */
const RenderSafeWrapper: React.FC<RenderSafeWrapperProps> = ({ 
  children, 
  fallback = null,
  context = 'unknown'
}) => {
  try {
    // 检查children是否包含不安全的渲染内容
    const checkRenderSafety = (element: any): boolean => {
      if (element === null || element === undefined) {
        return true
      }
      
      if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
        return true
      }
      
      if (React.isValidElement(element)) {
        return true
      }
      
      if (Array.isArray(element)) {
        return element.every(checkRenderSafety)
      }
      
      // 如果是普通对象，这可能会导致渲染错误
      if (typeof element === 'object' && element.constructor === Object) {
        console.error(`Unsafe render detected in ${context}:`, element)
        return false
      }
      
      return true
    }
    
    if (process.env.NODE_ENV === 'development') {
      if (!checkRenderSafety(children)) {
        console.error(`RenderSafeWrapper: Unsafe content detected in ${context}`)
        return <>{fallback || <span className="text-red-500">[Render Error]</span>}</>
      }
    }
    
    return <>{children}</>
  } catch (error) {
    console.error(`RenderSafeWrapper error in ${context}:`, error)
    return <>{fallback || <span className="text-red-500">[Render Error]</span>}</>
  }
}

export default RenderSafeWrapper

/**
 * 高阶组件：为组件添加渲染安全检查
 */
export function withRenderSafety<P extends object>(
  Component: React.ComponentType<P>,
  context?: string
) {
  const SafeComponent = (props: P) => {
    return (
      <RenderSafeWrapper context={context || Component.displayName || Component.name}>
        <Component {...props} />
      </RenderSafeWrapper>
    )
  }
  
  SafeComponent.displayName = `RenderSafe(${Component.displayName || Component.name})`
  
  return SafeComponent
}

/**
 * 安全文本渲染组件
 */
export const SafeText: React.FC<{ 
  children: any
  fallback?: string
  className?: string
}> = ({ children, fallback = '', className = '' }) => {
  const renderSafeText = (value: any): string => {
    if (value === null || value === undefined) {
      return fallback
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
    
    if (typeof value === 'object') {
      if (value.name && typeof value.name === 'string') {
        return value.name
      }
      
      if (value.title && typeof value.title === 'string') {
        return value.title
      }
      
      console.warn('SafeText: Converting object to string:', value)
      return fallback || '[Object]'
    }
    
    return String(value)
  }
  
  return <span className={className}>{renderSafeText(children)}</span>
}
