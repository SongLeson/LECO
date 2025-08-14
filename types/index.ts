// LECO 官网核心类型定义

// 导出所有类型定义
export * from './api'
export * from './components'
export * from './env'

// ============= 基础类型 =============

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// ============= 用户相关类型 =============

export interface User extends BaseEntity {
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  cart: CartItem[]
  favorites: string[]
  isLoggedIn: boolean
}

export interface UserPreferences {
  language: 'zh' | 'en'
  currency: 'CNY' | 'USD' | 'EUR'
  notifications: boolean
  theme: 'light' | 'dark'
}

// ============= 产品相关类型 =============

export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  images: ProductImage[]
  variants: ProductVariant[]
  category: Category
  tags: ProductTag[]
  specifications: Record<string, string>
  stock: number
  rating: number
  reviews: number
  isNew: boolean
  isHot: boolean
  isLimited: boolean
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
  isPrimary: boolean
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  stock: number
  sku: string
}

export interface Category extends BaseEntity {
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
}

export type ProductTag = 'NEW' | 'HOT' | 'LIMITED' | 'SALE' | 'BESTSELLER'

// ============= 购物车相关类型 =============

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  variant?: ProductVariant
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  count: number
  currency: string
}

// ============= 导航相关类型 =============

export interface MenuItem {
  id: string
  label: string
  href: string
  icon?: string
  children?: MenuItem[]
  isExternal?: boolean
  badge?: string
}

export interface NavigationState {
  isOpen: boolean
  activeItem?: string
  isScrolled: boolean
}

// ============= 内容相关类型 =============

export interface NewsArticle extends BaseEntity {
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: NewsCategory
  publishDate: string
  readTime: number
  slug: string
  author: Author
  tags: string[]
  isPublished: boolean
}

export type NewsCategory = 'brand' | 'review' | 'guide' | 'event'

export interface Author {
  id: string
  name: string
  avatar?: string
  bio?: string
}

// ============= 活动相关类型 =============

export interface Event extends BaseEntity {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  coverImage: string
  registrationUrl: string
  status: EventStatus
  maxParticipants?: number
  currentParticipants: number
  price?: number
  tags: string[]
}

export type EventStatus = 'upcoming' | 'ongoing' | 'ended' | 'cancelled'

// ============= 视频相关类型 =============

export interface VideoContent extends BaseEntity {
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: number
  category: VideoCategory
  relatedProducts: string[]
  views: number
  isAutoplay: boolean
}

export type VideoCategory = 'brand' | 'product' | 'tutorial' | 'event'

// ============= 社交媒体相关类型 =============

export interface SocialPost {
  id: string
  platform: SocialPlatform
  content: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  likes: number
  comments: number
  shares: number
  timestamp: string
  originalUrl: string
  author: {
    username: string
    avatar: string
  }
}

export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'facebook'

// ============= API 响应类型 =============

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  pagination?: PaginationInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// ============= 搜索相关类型 =============

export interface SearchSuggestion {
  products: Product[]
  categories: Category[]
  keywords: string[]
}

export interface SearchFilters {
  category?: string
  priceRange?: [number, number]
  tags?: ProductTag[]
  inStock?: boolean
  sortBy?: 'price' | 'rating' | 'newest' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}

// ============= 表单相关类型 =============

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SubscriptionForm {
  email: string
  preferences?: {
    newsletter: boolean
    promotions: boolean
    events: boolean
  }
}

// ============= 组件 Props 类型 =============

export interface CTAButton {
  id: string
  text: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  action: 'scroll' | 'navigate' | 'modal' | 'external'
  target: string
  icon?: string
  disabled?: boolean
  loading?: boolean
}

export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
  repeat?: boolean
  direction?: 'normal' | 'reverse' | 'alternate'
}

// ============= 错误处理类型 =============

export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: string
}

export type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

// ============= 性能监控类型 =============

export interface PerformanceMetrics {
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  fcp: number // First Contentful Paint
  ttfb: number // Time to First Byte
}

// ============= 埋点事件类型 =============

export interface AnalyticsEvent {
  eventName: string
  eventCategory: 'navigation' | 'product' | 'video' | 'form' | 'social'
  eventAction: string
  eventLabel?: string
  eventValue?: number
  userId?: string
  sessionId: string
  timestamp: string
  properties?: Record<string, any>
}

// ============= 国际化类型 =============

export interface LocaleConfig {
  code: string
  name: string
  flag: string
  currency: string
  dateFormat: string
  numberFormat: string
}

export type TranslationKey = string
export type TranslationValues = Record<string, string | number>

// ============= 主题配置类型 =============

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
  fonts: {
    display: string
    body: string
    mono: string
  }
  animations: {
    duration: {
      fast: number
      normal: number
      slow: number
    }
    easing: {
      ease: string
      easeIn: string
      easeOut: string
      easeInOut: string
    }
  }
}