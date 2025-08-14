// 应用常量定义

// ============= 品牌常量 =============

export const BRAND = {
  NAME: 'LECO',
  TAGLINE: 'MOVE BEYOND LIMITS',
  TAGLINE_CN: '释放潜能，突破极限',
  DESCRIPTION: 'Discover LECO\'s revolutionary sports gear. Push your limits with cutting-edge athletic footwear, apparel, and accessories designed for champions.',
  KEYWORDS: ['sports', 'athletic wear', 'footwear', 'performance', 'LECO', 'sportswear'],
} as const

// ============= 路由常量 =============

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  ABOUT: '/about',
  EVENTS: '/events',
  NEWS: '/news',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
} as const

// ============= API 端点常量 =============

export const API_ENDPOINTS = {
  MENU: '/api/menu',
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: '/api/products',
  CART: '/api/cart',
  SEARCH: '/api/search',
  USER: '/api/user',
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  FAVORITES: '/api/favorites',
  NEWS: '/api/news',
  EVENTS: '/api/events',
  VIDEOS: '/api/videos',
  SOCIAL: '/api/social',
  SUBSCRIBE: '/api/subscribe',
  CONTACT: '/api/contact',
  ANALYTICS: '/api/analytics',
  UPLOAD: '/api/upload',
  CONFIG: '/api/config',
} as const

// ============= 本地存储键名 =============

export const STORAGE_KEYS = {
  USER: 'leco_user',
  TOKEN: 'leco_token',
  REFRESH_TOKEN: 'leco_refresh_token',
  CART: 'leco_cart',
  FAVORITES: 'leco_favorites',
  LANGUAGE: 'leco_language',
  THEME: 'leco_theme',
  SEARCH_HISTORY: 'leco_search_history',
  PREFERENCES: 'leco_preferences',
} as const

// ============= 分页常量 =============

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PRODUCTS_PER_PAGE: 12,
  NEWS_PER_PAGE: 9,
  EVENTS_PER_PAGE: 6,
  SOCIAL_POSTS_PER_PAGE: 20,
  MAX_PAGE_SIZE: 100,
} as const

// ============= 媒体查询断点 =============

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// ============= 动画持续时间 =============

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const

// ============= 缓存时间 =============

export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  EXTRA_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const

// ============= 文件上传限制 =============

export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  MAX_FILES: 10,
} as const

// ============= 表单验证规则 =============

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\u4e00-\u9fa5\s]+$/,
  },
} as const

// ============= 错误代码 =============

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const

// ============= 成功消息 =============

export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED_TO_CART: '商品已添加到购物车',
  PRODUCT_ADDED_TO_FAVORITES: '商品已添加到收藏',
  SUBSCRIPTION_SUCCESS: '订阅成功！',
  CONTACT_FORM_SENT: '消息已发送，我们会尽快回复您',
  PROFILE_UPDATED: '个人信息已更新',
  PASSWORD_CHANGED: '密码已修改',
} as const

// ============= 错误消息 =============

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  VALIDATION_ERROR: '输入信息有误，请检查后重试',
  AUTHENTICATION_ERROR: '登录已过期，请重新登录',
  AUTHORIZATION_ERROR: '权限不足，无法执行此操作',
  NOT_FOUND_ERROR: '请求的资源不存在',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNKNOWN_ERROR: '未知错误，请稍后重试',
  PRODUCT_OUT_OF_STOCK: '商品库存不足',
  CART_EMPTY: '购物车为空',
  INVALID_EMAIL: '请输入有效的邮箱地址',
  INVALID_PASSWORD: '密码必须包含大小写字母、数字和特殊字符，至少8位',
  PASSWORDS_NOT_MATCH: '两次输入的密码不一致',
} as const

// ============= 社交媒体链接 =============

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/leco',
  INSTAGRAM: 'https://instagram.com/leco',
  TIKTOK: 'https://tiktok.com/@leco',
  YOUTUBE: 'https://youtube.com/leco',
  TWITTER: 'https://twitter.com/leco',
  LINKEDIN: 'https://linkedin.com/company/leco',
} as const

// ============= 联系信息 =============

export const CONTACT_INFO = {
  PHONE: '+86 400-123-4567',
  EMAIL: 'contact@leco.com',
  ADDRESS: '上海市浦东新区张江高科技园区',
  BUSINESS_HOURS: '周一至周五 9:00-18:00',
} as const

// ============= 支持的语言 =============

export const SUPPORTED_LANGUAGES = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const

// ============= 支持的货币 =============

export const SUPPORTED_CURRENCIES = [
  { code: 'CNY', symbol: '¥', name: '人民币' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
] as const

// ============= 产品分类 =============

export const PRODUCT_CATEGORIES = {
  FOOTWEAR: 'footwear',
  APPAREL: 'apparel',
  ACCESSORIES: 'accessories',
  EQUIPMENT: 'equipment',
} as const

// ============= 产品标签 =============

export const PRODUCT_TAGS = {
  NEW: 'NEW',
  HOT: 'HOT',
  LIMITED: 'LIMITED',
  SALE: 'SALE',
  BESTSELLER: 'BESTSELLER',
} as const

// ============= 事件类型 =============

export const EVENT_TYPES = {
  NAVIGATION: 'navigation',
  PRODUCT: 'product',
  VIDEO: 'video',
  FORM: 'form',
  SOCIAL: 'social',
  SEARCH: 'search',
  CART: 'cart',
  USER: 'user',
} as const

// ============= 设备类型检测 =============

export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
} as const