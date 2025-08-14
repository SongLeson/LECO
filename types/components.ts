// 组件相关类型定义

import { ReactNode, MouseEvent, KeyboardEvent } from 'react'
import { 
  Product, 
  VideoContent, 
  SocialPost, 
  Event, 
  NewsArticle, 
  CTAButton,
  AnimationConfig,
  User,
  MenuItem
} from './index'

// ============= 基础组件 Props =============

export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  id?: string
  'data-testid'?: string
}

// ============= 导航组件 =============

export interface NavigationProps extends BaseComponentProps {
  isScrolled: boolean
  currentLanguage: string
  user?: User
  onLanguageChange: (lang: string) => void
  onLogin: () => void
  onLogout: () => void
  onCartOpen: () => void
}

export interface MobileMenuProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  user?: User
}

export interface SearchBoxProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
  placeholder?: string
}

export interface CartPreviewProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
  total: number
  onViewCart: () => void
  onCheckout: () => void
}

// ============= 首屏组件 =============

export interface HeroSectionProps extends BaseComponentProps {
  videoSrc: string
  fallbackImage: string
  title: string
  subtitle: string
  ctaButtons: CTAButton[]
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export interface VideoBackgroundProps extends BaseComponentProps {
  src: string
  fallbackImage: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  onLoadStart?: () => void
  onLoadEnd?: () => void
  onError?: (error: any) => void
}

// ============= 产品展示组件 =============

export interface ProductShowcaseProps extends BaseComponentProps {
  products: Product[]
  title?: string
  showCount?: number
  enableCarousel?: boolean
  onViewAll?: () => void
}

export interface ProductCardProps extends BaseComponentProps {
  product: Product
  onAddToCart: (productId: string) => void
  onAddToFavorites: (productId: string) => void
  onViewDetails: (productId: string) => void
  showQuickActions?: boolean
  variant?: 'default' | 'compact' | 'featured'
}

export interface ProductCarouselProps extends BaseComponentProps {
  products: Product[]
  slidesPerView?: number
  spaceBetween?: number
  autoplay?: boolean
  navigation?: boolean
  pagination?: boolean
}

// ============= 品牌理念组件 =============

export interface BrandPhilosophyProps extends BaseComponentProps {
  content: {
    title: string
    description: string
    image: string
    cta: CTAButton
  }
  animationConfig?: AnimationConfig
}

// ============= 视频展示组件 =============

export interface SportsCinemaProps extends BaseComponentProps {
  videos: VideoContent[]
  featured?: VideoContent
  autoplay?: boolean
  showControls?: boolean
}

export interface VideoPlayerProps extends BaseComponentProps {
  src: string
  poster?: string
  title?: string
  description?: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

// ============= 社交互动组件 =============

export interface SocialHubProps extends BaseComponentProps {
  posts: SocialPost[]
  title?: string
  layout?: 'masonry' | 'grid'
  columns?: number
  showLoadMore?: boolean
  onLoadMore?: () => void
}

export interface SocialPostProps extends BaseComponentProps {
  post: SocialPost
  onView: (post: SocialPost) => void
  showStats?: boolean
}

// ============= 活动赛事组件 =============

export interface EventsProps extends BaseComponentProps {
  events: Event[]
  title?: string
  showCountdown?: boolean
  layout?: 'grid' | 'list'
  onRegister?: (eventId: string) => void
}

export interface EventCardProps extends BaseComponentProps {
  event: Event
  showCountdown?: boolean
  onRegister?: (eventId: string) => void
  variant?: 'default' | 'compact' | 'featured'
}

export interface CountdownProps extends BaseComponentProps {
  targetDate: string
  onComplete?: () => void
  format?: 'full' | 'compact'
}

// ============= 资讯组件 =============

export interface NewsSectionProps extends BaseComponentProps {
  articles: NewsArticle[]
  title?: string
  categories?: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  showLoadMore?: boolean
  onLoadMore?: () => void
}

export interface NewsCardProps extends BaseComponentProps {
  article: NewsArticle
  onRead: (articleId: string) => void
  variant?: 'default' | 'compact' | 'featured'
  showCategory?: boolean
  showReadTime?: boolean
}

// ============= 表单组件 =============

export interface SubscriptionFormProps extends BaseComponentProps {
  onSubmit: (email: string) => void
  loading?: boolean
  success?: boolean
  error?: string
  placeholder?: string
  buttonText?: string
}

export interface ContactFormProps extends BaseComponentProps {
  onSubmit: (data: any) => void
  loading?: boolean
  success?: boolean
  error?: string
}

// ============= 页脚组件 =============

export interface FooterProps extends BaseComponentProps {
  quickLinks: MenuItem[]
  socialLinks: Array<{
    platform: string
    url: string
    icon: string
  }>
  contactInfo: {
    phone?: string
    email?: string
    address?: string
  }
  legalLinks: MenuItem[]
}

// ============= UI 组件 =============

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  required?: boolean
  error?: string
  label?: string
  helperText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
}

export interface ToastProps extends BaseComponentProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  onClose?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
  overlay?: boolean
}

export interface ImageProps extends BaseComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

// ============= 动画组件 =============

export interface AnimatedElementProps extends BaseComponentProps {
  animation: 'fadeIn' | 'slideIn' | 'scaleIn' | 'rotateIn'
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  delay?: number
  trigger?: 'viewport' | 'hover' | 'click' | 'immediate'
  threshold?: number
  once?: boolean
}

export interface ParallaxProps extends BaseComponentProps {
  speed?: number
  direction?: 'up' | 'down'
  disabled?: boolean
}

// ============= 布局组件 =============

export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  center?: boolean
}

export interface GridProps extends BaseComponentProps {
  columns?: number
  gap?: number
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: number
}

// ============= 错误边界组件 =============

export interface ErrorBoundaryProps extends BaseComponentProps {
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: any) => void
}

export interface ErrorFallbackProps extends BaseComponentProps {
  error: Error
  resetError: () => void
}

// ============= 性能组件 =============

export interface LazyLoadProps extends BaseComponentProps {
  threshold?: number
  rootMargin?: string
  placeholder?: ReactNode
  onLoad?: () => void
}

export interface VirtualScrollProps extends BaseComponentProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => ReactNode
  overscan?: number
}