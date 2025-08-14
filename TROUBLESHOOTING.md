# 🔧 LECO 网站 - 控制台错误修复指南

## ✅ 已修复的常见控制台错误

### 1. **Hydration 错误修复**
```typescript
// 问题：服务端和客户端渲染不匹配
// 解决方案：添加 isMounted 状态检查

const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
  setIsMounted(true)
}, [])

if (!isMounted) {
  return <LoadingScreen />
}
```

### 2. **自定义光标 SSR 错误修复**
```typescript
// 问题：window 对象在服务端不存在
// 解决方案：添加浏览器环境检查

if (typeof window === 'undefined') return null

// 只在桌面端显示自定义光标
className="hidden md:block"
```

### 3. **视频自动播放错误修复**
```typescript
// 问题：浏览器阻止自动播放
// 解决方案：优雅处理自动播放失败

const playVideo = async () => {
  try {
    if (video.readyState >= 2) {
      await video.play()
    }
  } catch (error) {
    console.log('Autoplay prevented, user interaction required')
  }
}
```

### 4. **Smooth Scroll 库加载错误修复**
```typescript
// 问题：Lenis 库动态导入失败
// 解决方案：添加错误处理和重复初始化检查

if (typeof window !== 'undefined' && !lenis) {
  import('lenis').then((Lenis) => {
    try {
      lenis = new Lenis.default({...})
    } catch (error) {
      console.log('Smooth scroll initialization failed:', error)
    }
  }).catch((error) => {
    console.log('Failed to load Lenis:', error)
  })
}
```

### 5. **事件监听器内存泄漏修复**
```typescript
// 问题：组件卸载时事件监听器未清理
// 解决方案：在 useEffect cleanup 中移除所有监听器

useEffect(() => {
  // 添加监听器
  window.addEventListener('mousemove', updateMousePosition)
  
  return () => {
    // 清理监听器
    window.removeEventListener('mousemove', updateMousePosition)
    interactiveElements.forEach(el => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    })
  }
}, [])
```

### 6. **CSS 光标样式冲突修复**
```css
/* 问题：移动端显示自定义光标导致问题 */
/* 解决方案：只在桌面端隐藏默认光标 */

@media (min-width: 768px) {
  body {
    cursor: none;
  }
}
```

## 🛡️ 添加的错误边界

### ErrorBoundary 组件
```typescript
// 捕获所有 React 组件错误
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LECO App Error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackUI />
    }
    return this.props.children
  }
}
```

## 🔍 常见控制台警告解决

### 1. **Next.js Image 优化警告**
```javascript
// next.config.js 中已配置图片优化
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

### 2. **Framer Motion 动画性能警告**
```typescript
// 使用 GPU 加速的 transform 属性
style={{
  x: mousePosition.x,  // 而不是 left
  y: mousePosition.y,  // 而不是 top
}}
```

### 3. **第三方库类型警告**
```typescript
// 使用 any 类型处理动态导入的库
let lenis: any = null
```

## 🚀 性能优化修复

### 1. **组件懒加载**
```typescript
// 动态导入重型组件
const ThreeJSComponent = dynamic(() => import('./ThreeJS'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
```

### 2. **事件处理优化**
```typescript
// 使用 useCallback 避免重复创建函数
const handleMouseMove = useCallback((e: React.MouseEvent) => {
  // 处理逻辑
}, [mouseX, mouseY])
```

### 3. **动画性能优化**
```css
/* 启用硬件加速 */
.animate-element {
  will-change: transform;
  transform: translateZ(0);
}
```

## 🔧 开发环境设置

### 1. **TypeScript 严格模式**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. **ESLint 配置**
```json
// .eslintrc.json
{
  "extends": "next/core-web-vitals"
}
```

## 📱 兼容性修复

### 1. **移动端触摸事件**
```typescript
// 禁用移动端平滑滚动避免冲突
smoothTouch: false,
touchMultiplier: 2,
```

### 2. **浏览器兼容性**
```css
/* 添加厂商前缀 */
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

## 🎯 调试建议

### 1. **开发工具设置**
```bash
# 启用详细错误信息
npm run dev
```

### 2. **控制台过滤**
```javascript
// 只显示错误级别的日志
console.log() -> 开发信息
console.warn() -> 警告信息  
console.error() -> 错误信息
```

### 3. **网络请求监控**
- 检查视频文件是否正确加载
- 验证字体文件加载状态
- 监控 API 请求响应时间

## ✅ 验证清单

- [ ] 页面加载无 hydration 错误
- [ ] 自定义光标在桌面端正常工作
- [ ] 视频自动播放或用户点击后播放
- [ ] 平滑滚动功能正常
- [ ] 所有动画流畅运行
- [ ] 移动端触摸交互正常
- [ ] 错误边界能捕获异常
- [ ] 内存使用稳定，无泄漏

## 🔄 持续监控

建议在生产环境中集成错误监控工具：
- **Sentry** - 错误追踪
- **LogRocket** - 会话重放
- **Lighthouse** - 性能监控

---

现在LECO网站应该在控制台中运行得非常干净，没有错误和警告！🚀
