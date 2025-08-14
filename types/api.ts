// API 接口类型定义

import { 
  Product, 
  CartItem, 
  MenuItem, 
  NewsArticle, 
  Event, 
  VideoContent, 
  SocialPost,
  SearchSuggestion,
  User,
  ApiResponse,
  PaginationInfo
} from './index'

// ============= API 请求类型 =============

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, string | number | boolean>
  timeout?: number
  retries?: number
}

// ============= 菜单 API =============

export interface MenuApiResponse extends ApiResponse<{
  items: MenuItem[]
  userMenu: MenuItem[]
}> {}

// ============= 产品 API =============

export interface ProductsApiRequest {
  tag?: 'hot' | 'new' | 'limited' | 'sale'
  category?: string
  limit?: number
  page?: number
  sortBy?: 'price' | 'rating' | 'newest' | 'popularity'
  sortOrder?: 'asc' | 'desc'
  inStock?: boolean
}

export interface ProductsApiResponse extends ApiResponse<{
  products: Product[]
  pagination: PaginationInfo
}> {}

export interface ProductDetailApiResponse extends ApiResponse<Product> {}

// ============= 购物车 API =============

export interface CartApiResponse extends ApiResponse<{
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  count: number
  currency: string
}> {}

export interface AddToCartRequest {
  productId: string
  quantity: number
  variantId?: string
}

export interface UpdateCartItemRequest {
  itemId: string
  quantity: number
}

export interface AddToCartResponse extends ApiResponse<{
  item: CartItem
  cart: CartApiResponse['data']
}> {}

// ============= 搜索 API =============

export interface SearchApiRequest {
  q: string
  limit?: number
  categories?: boolean
  products?: boolean
}

export interface SearchApiResponse extends ApiResponse<SearchSuggestion> {}

// ============= 用户 API =============

export interface UserApiResponse extends ApiResponse<User> {}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface AuthResponse extends ApiResponse<{
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}> {}

// ============= 收藏 API =============

export interface FavoriteRequest {
  productId: string
}

export interface FavoritesApiResponse extends ApiResponse<{
  products: Product[]
  count: number
}> {}

// ============= 资讯 API =============

export interface NewsApiRequest {
  category?: 'brand' | 'review' | 'guide' | 'event'
  limit?: number
  page?: number
  featured?: boolean
}

export interface NewsApiResponse extends ApiResponse<{
  articles: NewsArticle[]
  pagination: PaginationInfo
}> {}

export interface NewsDetailApiResponse extends ApiResponse<NewsArticle> {}

// ============= 活动 API =============

export interface EventsApiRequest {
  status?: 'upcoming' | 'ongoing' | 'ended'
  limit?: number
  page?: number
  featured?: boolean
}

export interface EventsApiResponse extends ApiResponse<{
  events: Event[]
  pagination: PaginationInfo
}> {}

export interface EventDetailApiResponse extends ApiResponse<Event> {}

// ============= 视频 API =============

export interface VideosApiRequest {
  category?: 'brand' | 'product' | 'tutorial' | 'event'
  limit?: number
  page?: number
  featured?: boolean
}

export interface VideosApiResponse extends ApiResponse<{
  videos: VideoContent[]
  pagination: PaginationInfo
}> {}

// ============= 社交媒体 API =============

export interface SocialApiRequest {
  platform?: 'instagram' | 'tiktok' | 'youtube' | 'facebook'
  limit?: number
  page?: number
}

export interface SocialApiResponse extends ApiResponse<{
  posts: SocialPost[]
  pagination: PaginationInfo
}> {}

// ============= 订阅 API =============

export interface SubscribeRequest {
  email: string
  preferences?: {
    newsletter: boolean
    promotions: boolean
    events: boolean
  }
  source?: string
}

export interface SubscribeResponse extends ApiResponse<{
  email: string
  subscribed: boolean
  couponCode?: string
  message: string
}> {}

// ============= 联系表单 API =============

export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  company?: string
}

export interface ContactResponse extends ApiResponse<{
  ticketId: string
  message: string
}> {}

// ============= 埋点 API =============

export interface AnalyticsRequest {
  events: Array<{
    eventName: string
    eventCategory: string
    eventAction: string
    eventLabel?: string
    eventValue?: number
    properties?: Record<string, any>
  }>
  userId?: string
  sessionId: string
  timestamp: string
}

export interface AnalyticsResponse extends ApiResponse<{
  processed: number
  failed: number
}> {}

// ============= 文件上传 API =============

export interface UploadRequest {
  file: File
  type: 'image' | 'video' | 'document'
  category?: string
}

export interface UploadResponse extends ApiResponse<{
  url: string
  filename: string
  size: number
  type: string
}> {}

// ============= 配置 API =============

export interface ConfigApiResponse extends ApiResponse<{
  site: {
    name: string
    description: string
    logo: string
    favicon: string
    socialMedia: Record<string, string>
  }
  features: {
    search: boolean
    cart: boolean
    favorites: boolean
    newsletter: boolean
    multiLanguage: boolean
  }
  integrations: {
    analytics: string
    payment: string[]
    social: string[]
  }
}> {}

// ============= 错误响应类型 =============

export interface ApiError {
  code: string
  message: string
  details?: any
  timestamp: string
  path?: string
  method?: string
}

export interface ValidationError extends ApiError {
  fields: Record<string, string[]>
}

// ============= API 客户端配置 =============

export interface ApiClientConfig {
  baseURL: string
  timeout: number
  retries: number
  headers: Record<string, string>
  interceptors?: {
    request?: (config: ApiRequestConfig) => ApiRequestConfig
    response?: (response: any) => any
    error?: (error: any) => any
  }
}