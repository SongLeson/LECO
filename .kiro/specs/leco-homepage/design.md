# LECO 官网首页设计文档

## 概述

LECO 官网首页采用现代化的单页应用架构，基于 Next.js 14 + React 18 + TypeScript 技术栈，结合 Tailwind CSS 进行样式管理，使用 Framer Motion 和 GSAP 实现高性能动画效果。整体设计遵循移动优先原则，注重性能优化和 SEO 友好性。

## 技术架构

### 核心技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 库**: React 18 + TypeScript
- **样式方案**: Tailwind CSS + CSS Modules
- **动画库**: Framer Motion + GSAP + Lenis (平滑滚动)
- **3D 渲染**: Three.js + React Three Fiber
- **图标库**: Lucide React
- **轮播组件**: Swiper
- **状态管理**: React Context + Zustand (轻量级)
- **数据获取**: Next.js API Routes + SWR
- **性能监控**: Web Vitals + 自定义埋点

### 项目结构

```
app/
├── layout.tsx                 # 根布局
├── page.tsx                   # 首页
├── globals.css               # 全局样式
├── api/                      # API 路由
│   ├── menu/route.ts
│   ├── products/route.ts
│   ├── cart/route.ts
│   └── ...
components/
├── Navigation/               # 导航组件
├── HeroSection/             # 首屏组件
├── ProductShowcase/         # 产品展示
├── BrandPhilosophy/         # 品牌理念
├── SportsCinema/            # 视频区域
├── SocialHub/               # 社交互动
├── Footer/                  # 页脚
├── ui/                      # 通用 UI 组件
└── shared/                  # 共享组件
hooks/                       # 自定义 Hooks
utils/                       # 工具函数
types/                       # TypeScript 类型定义
```

## 组件设计与接口

### 1. Navigation 导航组件

#### 组件结构

```typescript
interface NavigationProps {
  isScrolled: boolean;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

interface UserState {
  isLoggedIn: boolean;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}
```

#### 核心功能

- **响应式布局**: PC 横向菜单 / 移动端汉堡菜单
- **多级菜单**: 支持二级下拉菜单，悬停展开
- **搜索功能**: 实时搜索建议，防抖优化
- **用户状态**: 登录/未登录状态切换
- **购物车预览**: 悬停显示商品列表
- **多语言切换**: 支持中英文切换

#### API 接口

```typescript
// GET /api/menu
interface MenuResponse {
  items: MenuItem[];
  userMenu: MenuItem[];
}

// GET /api/search?q=keyword
interface SearchResponse {
  suggestions: {
    products: Product[];
    categories: Category[];
  };
}

// GET /api/cart
interface CartResponse {
  items: CartItem[];
  total: number;
  count: number;
}
```

### 2. HeroSection 首屏组件

#### 组件结构

```typescript
interface HeroSectionProps {
  videoSrc: string;
  fallbackImage: string;
  title: string;
  subtitle: string;
  ctaButtons: CTAButton[];
}

interface CTAButton {
  id: string;
  text: string;
  variant: "primary" | "secondary";
  action: "scroll" | "navigate";
  target: string;
}
```

#### 核心功能

- **自适应视频**: 根据设备性能和网络状况选择视频质量
- **渐进式加载**: 视频 → 图片 → 颜色背景的降级策略
- **动画序列**: 页面加载时的文字滑入和按钮动效
- **交互反馈**: 按钮悬停发光、点击波纹效果

#### 性能优化

- 视频预加载策略
- 移动端低码率视频
- 懒加载和 Intersection Observer

### 3. ProductShowcase 产品展示组件

#### 组件结构

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  tags: ("NEW" | "HOT" | "LIMITED")[];
  category: string;
}

interface ProductShowcaseProps {
  products: Product[];
  showCount: number;
  enableCarousel: boolean;
}
```

#### 核心功能

- **产品轮播**: Swiper 实现的响应式轮播
- **懒加载图片**: Intersection Observer + 渐进式加载
- **交互动效**: 卡片悬停、按钮动画
- **购物车集成**: 一键加购、收藏功能

#### API 接口

```typescript
// GET /api/products?tag=hot&limit=6
interface ProductsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}

// POST /api/cart
interface AddToCartRequest {
  productId: string;
  quantity: number;
  variant?: string;
}
```

### 4. BrandPhilosophy 品牌理念组件

#### 组件结构

```typescript
interface BrandPhilosophyProps {
  content: {
    title: string;
    description: string;
    image: string;
    cta: CTAButton;
  };
}
```

#### 核心功能

- **滚动触发动画**: 使用 Intersection Observer 触发进入动画
- **SVG 路径动画**: GSAP 实现的光线流动效果
- **响应式布局**: 移动端上下布局，PC 端左右布局

### 5. SportsCinema 视频展示组件

#### 组件结构

```typescript
interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  relatedProducts: string[];
}

interface SportsCinemaProps {
  videos: VideoContent[];
  autoplay: boolean;
}
```

#### 核心功能

- **视频播放器**: 自定义控件，支持全屏播放
- **自动播放**: 静音自动播放，点击启用声音
- **产品关联**: 视频与产品的关联展示

#### API 接口

```typescript
// GET /api/videos?category=brand
interface VideosResponse {
  videos: VideoContent[];
}
```

### 6. SocialHub 社交互动组件

#### 组件结构

```typescript
interface SocialPost {
  id: string;
  platform: "instagram" | "tiktok" | "youtube";
  content: string;
  mediaUrl: string;
  likes: number;
  comments: number;
  timestamp: string;
  originalUrl: string;
}

interface SocialHubProps {
  posts: SocialPost[];
  layout: "masonry" | "grid";
}
```

#### 核心功能

- **瀑布流布局**: Masonry 布局实现
- **社交媒体集成**: Instagram/TikTok API 集成
- **实时更新**: 定时获取最新内容
- **交互动效**: 悬停放大、数据展示

### 7. Events 活动赛事组件

#### 组件结构

```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage: string;
  registrationUrl: string;
  status: "upcoming" | "ongoing" | "ended";
}

interface EventsProps {
  events: Event[];
  showCountdown: boolean;
}
```

#### 核心功能

- **倒计时功能**: 实时倒计时显示
- **活动状态**: 根据时间自动更新状态
- **报名集成**: 跳转到报名页面

### 8. NewsSection 资讯组件

#### 组件结构

```typescript
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "brand" | "review" | "guide";
  publishDate: string;
  readTime: number;
  slug: string;
}

interface NewsSectionProps {
  articles: NewsArticle[];
  categories: string[];
  showFilter: boolean;
}
```

#### 核心功能

- **分类筛选**: 按类别筛选资讯
- **分页加载**: 无限滚动或分页加载
- **SEO 优化**: 结构化数据和 meta 标签

## 数据模型

### 用户模型

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
  cart: CartItem[];
  favorites: string[];
}
```

### 产品模型

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: Category;
  tags: string[];
  specifications: Record<string, string>;
  stock: number;
  rating: number;
  reviews: number;
}
```

### 购物车模型

```typescript
interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variant?: ProductVariant;
  addedAt: string;
}
```

## 错误处理

### 错误边界

- **组件级错误边界**: 每个主要组件都有错误边界
- **全局错误处理**: 统一的错误处理和用户反馈
- **API 错误处理**: 网络错误、超时处理

### 降级策略

- **图片加载失败**: 显示占位图
- **视频加载失败**: 降级到静态图片
- **API 失败**: 显示缓存数据或默认内容

## 测试策略

### 单元测试

- **组件测试**: React Testing Library
- **工具函数测试**: Jest
- **API 测试**: MSW (Mock Service Worker)

### 集成测试

- **页面流程测试**: Playwright
- **API 集成测试**: 端到端测试
- **性能测试**: Lighthouse CI

### 视觉回归测试

- **截图对比**: Percy 或 Chromatic
- **跨浏览器测试**: BrowserStack

## 性能优化

### 加载优化

- **代码分割**: 动态导入和路由级分割
- **资源预加载**: 关键资源预加载
- **图片优化**: Next.js Image 组件 + WebP 格式
- **字体优化**: 字体预加载和 font-display

### 运行时优化

- **虚拟滚动**: 长列表虚拟化
- **防抖节流**: 搜索和滚动事件优化
- **内存管理**: 组件卸载时清理定时器和监听器

### 缓存策略

- **静态资源缓存**: CDN + 长期缓存
- **API 缓存**: SWR + 本地存储
- **页面缓存**: Next.js 静态生成

## SEO 和可访问性

### SEO 优化

- **结构化数据**: JSON-LD 格式
- **Open Graph**: 社交媒体分享优化
- **Sitemap**: 自动生成站点地图
- **robots.txt**: 搜索引擎爬取规则

### 可访问性

- **键盘导航**: 完整的键盘操作支持
- **屏幕阅读器**: ARIA 标签和语义化 HTML
- **颜色对比**: WCAG 2.1 AA 标准
- **焦点管理**: 清晰的焦点指示器

## 国际化

### 多语言支持

- **i18n 配置**: next-i18next 或 next-intl
- **动态语言切换**: 客户端语言切换
- **RTL 支持**: 阿拉伯语等从右到左语言支持

### 本地化

- **货币格式**: 根据地区显示货币
- **日期格式**: 本地化日期时间显示
- **数字格式**: 千分位分隔符等
