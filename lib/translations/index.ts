import { zh, type TranslationKeys } from './zh'
import { en } from './en'

export const translations = {
  zh,
  en,
} as const

export type SupportedLocale = keyof typeof translations
export type { TranslationKeys }

// 获取翻译文本的辅助函数
export function getTranslation(locale: SupportedLocale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // 如果找不到翻译，回退到中文
      value = translations.zh
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey]
        } else {
          return key // 如果中文也没有，返回key本身
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}

// 默认语言
export const DEFAULT_LOCALE: SupportedLocale = 'zh'

// 支持的语言列表
export const SUPPORTED_LOCALES: SupportedLocale[] = ['zh', 'en']
