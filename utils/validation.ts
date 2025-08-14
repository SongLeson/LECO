// 验证工具函数

import { VALIDATION_RULES } from '@/lib/constants'

/**
 * 验证邮箱格式
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL.test(email.trim())
}

/**
 * 验证手机号格式
 */
export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE.test(phone.replace(/\s/g, ''))
}

/**
 * 验证密码强度
 */
export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    errors.push(`密码长度至少${VALIDATION_RULES.PASSWORD.MIN_LENGTH}位`)
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('密码必须包含小写字母')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('密码必须包含大写字母')
  }
  
  if (!/\d/.test(password)) {
    errors.push('密码必须包含数字')
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('密码必须包含特殊字符')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * 验证姓名格式
 */
export const validateName = (name: string): {
  isValid: boolean
  error?: string
} => {
  const trimmedName = name.trim()
  
  if (trimmedName.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return {
      isValid: false,
      error: `姓名长度至少${VALIDATION_RULES.NAME.MIN_LENGTH}位`
    }
  }
  
  if (trimmedName.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return {
      isValid: false,
      error: `姓名长度不能超过${VALIDATION_RULES.NAME.MAX_LENGTH}位`
    }
  }
  
  if (!VALIDATION_RULES.NAME.PATTERN.test(trimmedName)) {
    return {
      isValid: false,
      error: '姓名只能包含字母、中文和空格'
    }
  }
  
  return { isValid: true }
}

/**
 * 验证 URL 格式
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证身份证号码（简单验证）
 */
export const validateIdCard = (idCard: string): boolean => {
  const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return pattern.test(idCard)
}

/**
 * 验证银行卡号（Luhn 算法）
 */
export const validateBankCard = (cardNumber: string): boolean => {
  const num = cardNumber.replace(/\s/g, '')
  
  if (!/^\d+$/.test(num)) return false
  if (num.length < 13 || num.length > 19) return false
  
  let sum = 0
  let isEven = false
  
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i])
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

/**
 * 验证文件类型
 */
export const validateFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type)
}

/**
 * 验证文件大小
 */
export const validateFileSize = (
  file: File,
  maxSizeInBytes: number
): boolean => {
  return file.size <= maxSizeInBytes
}

/**
 * 验证图片尺寸
 */
export const validateImageDimensions = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img.width <= maxWidth && img.height <= maxHeight)
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }
    
    img.src = url
  })
}

/**
 * 验证年龄范围
 */
export const validateAge = (
  birthDate: string | Date,
  minAge: number = 0,
  maxAge: number = 150
): {
  isValid: boolean
  age?: number
  error?: string
} => {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate
  const today = new Date()
  
  if (birth > today) {
    return {
      isValid: false,
      error: '出生日期不能是未来日期'
    }
  }
  
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())
    ? age - 1
    : age
  
  if (actualAge < minAge) {
    return {
      isValid: false,
      age: actualAge,
      error: `年龄不能小于${minAge}岁`
    }
  }
  
  if (actualAge > maxAge) {
    return {
      isValid: false,
      age: actualAge,
      error: `年龄不能大于${maxAge}岁`
    }
  }
  
  return {
    isValid: true,
    age: actualAge
  }
}

/**
 * 验证表单字段
 */
export const validateField = (
  value: any,
  rules: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: any) => boolean | string
  }
): {
  isValid: boolean
  error?: string
} => {
  const { required, minLength, maxLength, pattern, custom } = rules
  
  // 必填验证
  if (required && (!value || (typeof value === 'string' && !value.trim()))) {
    return { isValid: false, error: '此字段为必填项' }
  }
  
  // 如果值为空且非必填，则通过验证
  if (!value && !required) {
    return { isValid: true }
  }
  
  const stringValue = String(value)
  
  // 最小长度验证
  if (minLength && stringValue.length < minLength) {
    return { isValid: false, error: `最少需要${minLength}个字符` }
  }
  
  // 最大长度验证
  if (maxLength && stringValue.length > maxLength) {
    return { isValid: false, error: `最多允许${maxLength}个字符` }
  }
  
  // 正则表达式验证
  if (pattern && !pattern.test(stringValue)) {
    return { isValid: false, error: '格式不正确' }
  }
  
  // 自定义验证
  if (custom) {
    const result = custom(value)
    if (typeof result === 'string') {
      return { isValid: false, error: result }
    }
    if (!result) {
      return { isValid: false, error: '验证失败' }
    }
  }
  
  return { isValid: true }
}

/**
 * 验证整个表单
 */
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, Parameters<typeof validateField>[1]>
): {
  isValid: boolean
  errors: Partial<Record<keyof T, string>>
} => {
  const errors: Partial<Record<keyof T, string>> = {}
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const result = validateField(data[field], fieldRules)
    if (!result.isValid) {
      errors[field as keyof T] = result.error
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * 防抖验证（用于实时验证）
 */
export const createDebouncedValidator = (
  validator: (value: any) => Promise<boolean> | boolean,
  delay: number = 300
) => {
  let timeoutId: NodeJS.Timeout
  
  return (value: any): Promise<boolean> => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(async () => {
        const result = await validator(value)
        resolve(result)
      }, delay)
    })
  }
}