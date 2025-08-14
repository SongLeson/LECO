'use client'

import { useEffect, useState } from 'react'

interface HydrationFixProps {
  children: React.ReactNode
}

/**
 * 修复水合错误的包装组件
 * 通过延迟渲染子组件来避免服务端和客户端渲染不匹配的问题
 */
const HydrationFix: React.FC<HydrationFixProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // 在服务端渲染时返回null，避免水合错误
  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

export default HydrationFix

/**
 * 高阶组件版本：为组件添加水合修复
 */
export function withHydrationFix<P extends object>(
  Component: React.ComponentType<P>
) {
  const WrappedComponent = (props: P) => (
    <HydrationFix>
      <Component {...props} />
    </HydrationFix>
  )

  WrappedComponent.displayName = `withHydrationFix(${Component.displayName || Component.name})`

  return WrappedComponent
}

/**
 * 条件渲染组件：只在客户端渲染
 */
export const ClientOnly: React.FC<{
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
