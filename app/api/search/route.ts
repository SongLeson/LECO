// 搜索 API 路由

import { NextRequest, NextResponse } from 'next/server'
import { SearchApiResponse } from '@/types/api'
import { Product, Category } from '@/types'

/**
 * 搜索建议 API
 */
export async function GET(request: NextRequest): Promise<NextResponse<SearchApiResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')
    const includeCategories = searchParams.get('categories') !== 'false'
    const includeProducts = searchParams.get('products') !== 'false'

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        data: {
          products: [],
          categories: [],
          keywords: [],
        },
        success: true,
        message: 'Query too short',
      }, { status: 200 })
    }

    const searchTerm = query.trim().toLowerCase()

    // 模拟产品数据
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'LECO Air Max Pro',
        description: '革命性的运动鞋，采用最新的气垫技术',
        price: 899,
        originalPrice: 1299,
        currency: 'CNY',
        images: [
          {
            id: '1-1',
            url: '/images/products/shoe-1-main.jpg',
            alt: 'LECO Air Max Pro',
            width: 800,
            height: 600,
            isPrimary: true,
          },
        ],
        variants: [],
        category: {
          id: 'footwear',
          name: '运动鞋',
          slug: 'footwear',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['HOT'],
        specifications: {},
        stock: 15,
        rating: 4.8,
        reviews: 156,
        isNew: false,
        isHot: true,
        isLimited: false,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '2',
        name: 'LECO Performance Tee',
        description: '高性能运动T恤，速干透气',
        price: 299,
        currency: 'CNY',
        images: [
          {
            id: '2-1',
            url: '/images/products/tee-1-main.jpg',
            alt: 'LECO Performance Tee',
            width: 800,
            height: 600,
            isPrimary: true,
          },
        ],
        variants: [],
        category: {
          id: 'apparel',
          name: '运动服装',
          slug: 'apparel',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['NEW'],
        specifications: {},
        stock: 35,
        rating: 4.6,
        reviews: 89,
        isNew: true,
        isHot: false,
        isLimited: false,
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
      },
      {
        id: '3',
        name: 'LECO Elite Backpack',
        description: '专业运动背包，多功能设计',
        price: 599,
        currency: 'CNY',
        images: [
          {
            id: '3-1',
            url: '/images/products/backpack-1-main.jpg',
            alt: 'LECO Elite Backpack',
            width: 800,
            height: 600,
            isPrimary: true,
          },
        ],
        variants: [],
        category: {
          id: 'accessories',
          name: '配件',
          slug: 'accessories',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['LIMITED'],
        specifications: {},
        stock: 11,
        rating: 4.9,
        reviews: 67,
        isNew: false,
        isHot: false,
        isLimited: true,
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
      },
    ]

    // 模拟分类数据
    const mockCategories: Category[] = [
      {
        id: 'footwear',
        name: '运动鞋',
        slug: 'footwear',
        description: '各类运动鞋产品',
        image: '/images/categories/footwear.jpg',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'apparel',
        name: '运动服装',
        slug: 'apparel',
        description: '运动服装系列',
        image: '/images/categories/apparel.jpg',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'accessories',
        name: '配件',
        slug: 'accessories',
        description: '运动配件产品',
        image: '/images/categories/accessories.jpg',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ]

    // 搜索产品
    let matchedProducts: Product[] = []
    if (includeProducts) {
      matchedProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.name.toLowerCase().includes(searchTerm)
      ).slice(0, limit)
    }

    // 搜索分类
    let matchedCategories: Category[] = []
    if (includeCategories) {
      matchedCategories = mockCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm) ||
        (category.description && category.description.toLowerCase().includes(searchTerm))
      ).slice(0, Math.min(limit, 5))
    }

    // 生成搜索关键词建议
    const keywords: string[] = []
    
    // 基于产品名称生成关键词
    mockProducts.forEach(product => {
      const words = product.name.toLowerCase().split(' ')
      words.forEach(word => {
        if (word.includes(searchTerm) && !keywords.includes(word)) {
          keywords.push(word)
        }
      })
    })

    // 基于分类生成关键词
    mockCategories.forEach(category => {
      if (category.name.toLowerCase().includes(searchTerm) && !keywords.includes(category.name)) {
        keywords.push(category.name)
      }
    })

    // 添加一些常见的搜索建议
    const commonSuggestions = [
      '运动鞋', '跑步鞋', '篮球鞋', '运动服', 'T恤', '短裤', 
      '背包', '水杯', '护腕', '头带', '袜子', '运动内衣'
    ]

    commonSuggestions.forEach(suggestion => {
      if (suggestion.includes(searchTerm) && !keywords.includes(suggestion)) {
        keywords.push(suggestion)
      }
    })

    const response: SearchApiResponse = {
      data: {
        products: matchedProducts,
        categories: matchedCategories,
        keywords: keywords.slice(0, 8), // 限制关键词数量
      },
      success: true,
      message: 'Search suggestions retrieved successfully',
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })

  } catch (error) {
    console.error('Search API error:', error)

    const errorResponse: SearchApiResponse = {
      data: {
        products: [],
        categories: [],
        keywords: [],
      },
      success: false,
      error: 'Failed to retrieve search suggestions',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}