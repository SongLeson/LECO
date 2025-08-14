// 错误边界组件

'use client'

import React, { Component, ReactNode } from 'react'
import { ErrorBoundaryState, ErrorBoundaryProps } from '@/types/components'

interface ErrorBoundaryComponentState extends ErrorBoundaryState {
  eventId?: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryComponentState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryComponentState {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // 检查是否是水合错误
    const isHydrationError = error.message.includes('Hydration failed') ||
                            error.message.includes('hydration') ||
                            error.message.includes('did not match')

    if (isHydrationError) {
      console.warn('Hydration error detected, attempting recovery...')
      // 对于水合错误，延迟一下再重新渲染，让客户端状态稳定
      setTimeout(() => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined })
      }, 100)
      return
    }

    // 更新状态
    this.setState({
      error,
      errorInfo,
    })

    // 调用错误回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // 发送错误到监控服务（非水合错误才发送）
    this.logErrorToService(error, errorInfo)
  }

  private logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    try {
      // 这里可以集成 Sentry、LogRocket 等错误监控服务
      if (typeof window !== 'undefined') {
        // 发送错误信息到分析服务
        const errorData = {
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }

        // 示例：发送到自定义错误收集端点
        fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorData),
        }).catch(err => {
          console.error('Failed to log error to service:', err)
        })
      }
    } catch (loggingError) {
      console.error('Error logging failed:', loggingError)
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义的错误 UI，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误 UI
      return (
        <div className="min-h-screen bg-leco-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-leco-gray rounded-lg p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                出现了一些问题
              </h2>
              <p className="text-leco-silver text-sm mb-4">
                页面遇到了意外错误，我们已经记录了这个问题。
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-3 bg-leco-carbon rounded text-left">
                <p className="text-red-400 text-xs font-mono mb-2">
                  {this.state.error.message}
                </p>
                <details className="text-xs text-leco-silver">
                  <summary className="cursor-pointer mb-2">Stack Trace</summary>
                  <pre className="whitespace-pre-wrap text-xs">
                    {this.state.error.stack}
                  </pre>
                </details>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-medium py-2 px-4 rounded transition-colors"
              >
                重试
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-leco-gray hover:bg-leco-carbon text-white font-medium py-2 px-4 rounded transition-colors border border-leco-dark-silver"
              >
                刷新页面
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-leco-dark-silver">
              <p className="text-xs text-leco-dark-silver">
                如果问题持续存在，请{' '}
                <a
                  href="/contact"
                  className="text-leco-electric-blue hover:underline"
                >
                  联系我们
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// 错误回退组件
export const ErrorFallback: React.FC<{
  error: Error
  resetError: () => void
}> = ({ error, resetError }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          组件加载失败
        </h3>
        <p className="text-leco-silver text-sm mb-4">
          {error.message}
        </p>
        <button
          onClick={resetError}
          className="bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-medium py-2 px-4 rounded transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  )
}

// 高阶组件：为组件添加错误边界
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}