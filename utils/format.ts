// 格式化工具函数

/**
 * 格式化价格
 */
export const formatPrice = (
  price: number,
  currency: string = 'CNY',
  locale: string = 'zh-CN'
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  
  return formatter.format(price)
}

/**
 * 格式化数字（千分位分隔符）
 */
export const formatNumber = (
  num: number,
  locale: string = 'zh-CN'
): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * 格式化日期
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'zh-CN'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  }
  
  return new Intl.DateTimeFormat(locale, options[format]).format(dateObj)
}

/**
 * 格式化相对时间
 */
export const formatRelativeTime = (
  date: string | Date,
  locale: string = 'zh-CN'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
  }
}

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 格式化时长（秒转为 mm:ss 格式）
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * 格式化百分比
 */
export const formatPercentage = (
  value: number,
  total: number,
  decimals: number = 1
): string => {
  const percentage = (value / total) * 100
  return `${percentage.toFixed(decimals)}%`
}

/**
 * 截断文本
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = '...'
): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * 格式化手机号（隐藏中间数字）
 */
export const formatPhoneNumber = (phone: string): string => {
  if (phone.length !== 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化邮箱（隐藏部分字符）
 */
export const formatEmail = (email: string): string => {
  const [username, domain] = email.split('@')
  if (username.length <= 3) return email
  
  const visibleChars = Math.max(1, Math.floor(username.length / 3))
  const hiddenPart = '*'.repeat(username.length - visibleChars * 2)
  
  return `${username.slice(0, visibleChars)}${hiddenPart}${username.slice(-visibleChars)}@${domain}`
}

/**
 * 格式化 URL slug
 */
export const formatSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/[\s_-]+/g, '-') // 替换空格和下划线为连字符
    .replace(/^-+|-+$/g, '') // 移除开头和结尾的连字符
}

/**
 * 格式化搜索关键词高亮
 */
export const highlightSearchTerm = (
  text: string,
  searchTerm: string,
  className: string = 'highlight'
): string => {
  if (!searchTerm) return text
  
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  return text.replace(regex, `<span class="${className}">$1</span>`)
}

/**
 * 格式化倒计时
 */
export const formatCountdown = (targetDate: string | Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
} => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds, isExpired: false }
}

/**
 * 格式化评分星级
 */
export const formatRating = (rating: number, maxRating: number = 5): {
  fullStars: number
  halfStar: boolean
  emptyStars: number
} => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0)
  
  return { fullStars, halfStar, emptyStars }
}