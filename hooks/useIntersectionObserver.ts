// useIntersectionObserver Hook

import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

/**
 * Intersection Observer Hook
 * @param options Intersection Observer 配置选项
 * @returns [ref, entry, isIntersecting]
 */
export default function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, IntersectionObserverEntry | undefined, boolean] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options

  const elementRef = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isIntersecting, setIsIntersecting] = useState(false)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
    setIsIntersecting(entry.isIntersecting)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM 节点
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return [elementRef, entry, isIntersecting]
}

/**
 * 多元素 Intersection Observer Hook
 * @param options Intersection Observer 配置选项
 * @returns [addRef, removeRef, entries]
 */
export function useMultipleIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [
  (element: T | null) => void,
  (element: T | null) => void,
  Map<T, IntersectionObserverEntry>
] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options

  const [entries, setEntries] = useState<Map<T, IntersectionObserverEntry>>(new Map())
  const observerRef = useRef<IntersectionObserver>()
  const elementsRef = useRef<Set<T>>(new Set())

  const updateEntries = (observerEntries: IntersectionObserverEntry[]): void => {
    setEntries(prev => {
      const newEntries = new Map(prev)
      
      observerEntries.forEach(entry => {
        const element = entry.target as T
        
        if (freezeOnceVisible && prev.get(element)?.isIntersecting) {
          return // 保持之前的状态
        }
        
        newEntries.set(element, entry)
      })
      
      return newEntries
    })
  }

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport) return

    const observerParams = { threshold, root, rootMargin }
    observerRef.current = new IntersectionObserver(updateEntries, observerParams)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  const addRef = (element: T | null): void => {
    if (!element || !observerRef.current) return
    
    elementsRef.current.add(element)
    observerRef.current.observe(element)
  }

  const removeRef = (element: T | null): void => {
    if (!element || !observerRef.current) return
    
    elementsRef.current.delete(element)
    observerRef.current.unobserve(element)
    
    setEntries(prev => {
      const newEntries = new Map(prev)
      newEntries.delete(element)
      return newEntries
    })
  }

  return [addRef, removeRef, entries]
}

/**
 * 懒加载 Hook
 * @param options Intersection Observer 配置选项
 * @returns [ref, isVisible, hasBeenVisible]
 */
export function useLazyLoad<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, boolean] {
  const [ref, entry, isIntersecting] = useIntersectionObserver<T>({
    ...options,
    freezeOnceVisible: true,
  })
  
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (isIntersecting && !hasBeenVisible) {
      setHasBeenVisible(true)
    }
  }, [isIntersecting, hasBeenVisible])

  return [ref, isIntersecting, hasBeenVisible]
}

/**
 * 滚动触发动画 Hook
 * @param options Intersection Observer 配置选项
 * @returns [ref, shouldAnimate]
 */
export function useScrollTrigger<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const [ref, entry, isIntersecting] = useIntersectionObserver<T>({
    threshold: 0.1,
    ...options,
  })

  return [ref, isIntersecting]
}

/**
 * 视口可见性 Hook
 * @param options Intersection Observer 配置选项
 * @returns [ref, visibilityRatio]
 */
export function useVisibilityRatio<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, number] {
  const [ref, entry] = useIntersectionObserver<T>({
    threshold: [0, 0.25, 0.5, 0.75, 1],
    ...options,
  })

  const visibilityRatio = entry?.intersectionRatio ?? 0

  return [ref, visibilityRatio]
}