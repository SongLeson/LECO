// 菜单 API 路由

import { NextRequest, NextResponse } from 'next/server'
import { MenuApiResponse } from '@/types/api'
import { MenuItem } from '@/types'

/**
 * 获取菜单数据
 */
export async function GET(request: NextRequest): Promise<NextResponse<MenuApiResponse>> {
  try {
    // 模拟菜单数据
    const menuItems: MenuItem[] = [
      {
        id: 'home',
        label: '首页',
        href: '/',
        icon: 'home',
      },
      {
        id: 'products',
        label: '产品中心',
        href: '/products',
        icon: 'shopping-bag',
        children: [
          {
            id: 'footwear',
            label: '运动鞋',
            href: '/products/footwear',
            badge: 'NEW',
          },
          {
            id: 'apparel',
            label: '运动服装',
            href: '/products/apparel',
          },
          {
            id: 'accessories',
            label: '配件',
            href: '/products/accessories',
          },
          {
            id: 'equipment',
            label: '运动器材',
            href: '/products/equipment',
          },
        ],
      },
      {
        id: 'about',
        label: '品牌故事',
        href: '/about',
        icon: 'info',
      },
      {
        id: 'events',
        label: '活动与赛事',
        href: '/events',
        icon: 'calendar',
        badge: 'HOT',
      },
      {
        id: 'news',
        label: '资讯',
        href: '/news',
        icon: 'newspaper',
      },
      {
        id: 'contact',
        label: '联系我们',
        href: '/contact',
        icon: 'mail',
      },
    ]

    const userMenu: MenuItem[] = [
      {
        id: 'profile',
        label: '个人中心',
        href: '/profile',
        icon: 'user',
      },
      {
        id: 'orders',
        label: '我的订单',
        href: '/orders',
        icon: 'package',
      },
      {
        id: 'favorites',
        label: '收藏夹',
        href: '/favorites',
        icon: 'heart',
      },
      {
        id: 'settings',
        label: '设置',
        href: '/settings',
        icon: 'settings',
      },
      {
        id: 'logout',
        label: '退出登录',
        href: '/logout',
        icon: 'log-out',
      },
    ]

    const response: MenuApiResponse = {
      data: {
        items: menuItems,
        userMenu: userMenu,
      },
      success: true,
      message: 'Menu data retrieved successfully',
    }

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })

  } catch (error) {
    console.error('Menu API error:', error)

    const errorResponse: MenuApiResponse = {
      data: { items: [], userMenu: [] },
      success: false,
      error: 'Failed to retrieve menu data',
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}