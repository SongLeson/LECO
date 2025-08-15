// 产品 API 路由

import { NextRequest, NextResponse } from 'next/server'
import { ProductsApiResponse } from '@/types/api'
import { Product } from '@/types'

/**
 * 获取产品列表
 */
export async function GET(request: NextRequest): Promise<NextResponse<ProductsApiResponse>> {
  try {
    const { searchParams } = new URL(request.url)
    
    // 解析查询参数
    const tag = searchParams.get('tag') as 'hot' | 'new' | 'limited' | 'sale' | null
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '12')
    const page = parseInt(searchParams.get('page') || '1')
    const sortBy = searchParams.get('sortBy') as 'price' | 'rating' | 'newest' | 'popularity' || 'popularity'
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc'
    const inStock = searchParams.get('inStock') === 'true'

    // 模拟产品数据
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'LECO Air Max Pro',
        description: '革命性的运动鞋，采用最新的气垫技术，提供卓越的缓震和支撑。',
        price: 899,
        originalPrice: 1299,
        currency: 'CNY',
        images: [
          {
            id: '1-1',
            url: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'LECO Air Max Pro 主图',
            width: 800,
            height: 600,
            isPrimary: true,
          },
          {
            id: '1-2',
            url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'LECO Air Max Pro 侧面',
            width: 800,
            height: 600,
            isPrimary: false,
          },
        ],
        variants: [
          {
            id: '1-v1',
            name: '尺码',
            value: '42',
            stock: 10,
            sku: 'LECO-AMP-42',
          },
          {
            id: '1-v2',
            name: '尺码',
            value: '43',
            stock: 5,
            sku: 'LECO-AMP-43',
          },
        ],
        category: {
          id: 'footwear',
          name: '运动鞋',
          slug: 'footwear',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['HOT', 'SALE'],
        specifications: {
          '材质': '合成革 + 网布',
          '鞋底': 'EVA + 橡胶',
          '适用场景': '跑步、健身、日常',
          '重量': '约280g（单只）',
        },
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
        description: '高性能运动T恤，采用速干面料，保持运动时的舒适干爽。',
        price: 299,
        currency: 'CNY',
        images: [
          {
            id: '2-1',
            url: '/images/products/tee-1-main.jpg',
            alt: 'LECO Performance Tee 主图',
            width: 800,
            height: 600,
            isPrimary: true,
          },
        ],
        variants: [
          {
            id: '2-v1',
            name: '尺码',
            value: 'M',
            stock: 20,
            sku: 'LECO-PT-M',
          },
          {
            id: '2-v2',
            name: '尺码',
            value: 'L',
            stock: 15,
            sku: 'LECO-PT-L',
          },
        ],
        category: {
          id: 'apparel',
          name: '运动服装',
          slug: 'apparel',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['NEW'],
        specifications: {
          '材质': '100% 聚酯纤维',
          '功能': '速干、透气、抗菌',
          '适用场景': '跑步、健身、训练',
          '洗涤': '机洗，低温烘干',
        },
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
        description: '专业运动背包，多功能分隔设计，满足各种运动需求。',
        price: 599,
        currency: 'CNY',
        images: [
          {
            id: '3-1',
            url: '/images/products/backpack-1-main.jpg',
            alt: 'LECO Elite Backpack 主图',
            width: 800,
            height: 600,
            isPrimary: true,
          },
        ],
        variants: [
          {
            id: '3-v1',
            name: '颜色',
            value: '黑色',
            stock: 8,
            sku: 'LECO-EB-BLACK',
          },
          {
            id: '3-v2',
            name: '颜色',
            value: '蓝色',
            stock: 3,
            sku: 'LECO-EB-BLUE',
          },
        ],
        category: {
          id: 'accessories',
          name: '配件',
          slug: 'accessories',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        tags: ['LIMITED'],
        specifications: {
          '容量': '30L',
          '材质': '防水尼龙',
          '尺寸': '45 x 30 x 15 cm',
          '重量': '约1.2kg',
        },
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

    // 过滤产品
    let filteredProducts = mockProducts

    if (tag) {
      filteredProducts = filteredProducts.filter(product => 
        product.tags.includes(tag.toUpperCase() as any)
      )
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.slug === category
      )
    }

    if (inStock) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0)
    }

    // 排序产品
    filteredProducts.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'newest':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'popularity':
          comparison = a.reviews - b.reviews
          break
        default:
          comparison = 0
      }

      return sortOrder === 'desc' ? -comparison : comparison
    })

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    const response: ProductsApiResponse = {
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          limit,
          total: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / limit),
          hasNext: endIndex < filteredProducts.length,
          hasPrev: page > 1,
        },
      },
      success: true,
      message: 'Products retrieved successfully',
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    })

  } catch (error) {
    console.error('Products API error:', error)

    const errorResponse: ProductsApiResponse = {
      data: {
        products: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      },
      success: false,
      error: 'Failed to retrieve products',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}