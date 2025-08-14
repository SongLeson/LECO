// 订阅API路由

import { NextRequest, NextResponse } from 'next/server'

// Mock订阅数据存储
const subscribers: Array<{
  id: string
  email: string
  subscribeDate: string
  status: 'active' | 'pending' | 'unsubscribed'
  preferences: string[]
}> = []

// 邮箱验证函数
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 检查邮箱是否已订阅
const isEmailSubscribed = (email: string): boolean => {
  return subscribers.some(sub => sub.email === email && sub.status === 'active')
}

// 生成订阅ID
const generateSubscriptionId = (): string => {
  return `SUB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, preferences = [] } = body

    // 验证邮箱
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required' 
        },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // 检查是否已订阅
    if (isEmailSubscribed(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email already subscribed' 
        },
        { status: 400 }
      )
    }

    // 创建新订阅
    const newSubscriber = {
      id: generateSubscriptionId(),
      email,
      subscribeDate: new Date().toISOString(),
      status: 'pending' as const,
      preferences: preferences || ['news', 'products', 'events']
    }

    subscribers.push(newSubscriber)

    // 模拟发送确认邮件
    console.log('Sending confirmation email to:', email)
    
    // 在实际应用中，这里会：
    // 1. 发送确认邮件
    // 2. 保存到数据库
    // 3. 可能集成第三方邮件服务（如SendGrid, Mailchimp等）

    return NextResponse.json({
      success: true,
      data: {
        message: 'Subscription successful',
        subscriptionId: newSubscriber.id,
        email: newSubscriber.email,
        status: newSubscriber.status,
        confirmationSent: true
      }
    })
  } catch (error) {
    console.error('Subscribe API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Subscription failed' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const status = searchParams.get('status')

    let filteredSubscribers = [...subscribers]

    // 邮箱筛选
    if (email) {
      filteredSubscribers = filteredSubscribers.filter(sub => 
        sub.email.toLowerCase().includes(email.toLowerCase())
      )
    }

    // 状态筛选
    if (status) {
      filteredSubscribers = filteredSubscribers.filter(sub => sub.status === status)
    }

    return NextResponse.json({
      success: true,
      data: {
        subscribers: filteredSubscribers,
        total: filteredSubscribers.length,
        stats: {
          active: subscribers.filter(sub => sub.status === 'active').length,
          pending: subscribers.filter(sub => sub.status === 'pending').length,
          unsubscribed: subscribers.filter(sub => sub.status === 'unsubscribed').length
        }
      }
    })
  } catch (error) {
    console.error('Get subscribers API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch subscribers' 
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscriptionId, action, preferences } = body

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subscription ID and action are required' 
        },
        { status: 400 }
      )
    }

    const subscriberIndex = subscribers.findIndex(sub => sub.id === subscriptionId)
    
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subscription not found' 
        },
        { status: 404 }
      )
    }

    const subscriber = subscribers[subscriberIndex]

    switch (action) {
      case 'confirm':
        subscriber.status = 'active'
        break
      
      case 'unsubscribe':
        subscriber.status = 'unsubscribed'
        break
      
      case 'update_preferences':
        if (preferences && Array.isArray(preferences)) {
          subscriber.preferences = preferences
        }
        break
      
      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid action' 
          },
          { status: 400 }
        )
    }

    subscribers[subscriberIndex] = subscriber

    return NextResponse.json({
      success: true,
      data: {
        message: `Subscription ${action} successful`,
        subscriber: subscriber
      }
    })
  } catch (error) {
    console.error('Update subscription API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update subscription' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get('id')
    const email = searchParams.get('email')

    if (!subscriptionId && !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subscription ID or email is required' 
        },
        { status: 400 }
      )
    }

    let subscriberIndex = -1

    if (subscriptionId) {
      subscriberIndex = subscribers.findIndex(sub => sub.id === subscriptionId)
    } else if (email) {
      subscriberIndex = subscribers.findIndex(sub => sub.email === email)
    }

    if (subscriberIndex === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Subscription not found' 
        },
        { status: 404 }
      )
    }

    const removedSubscriber = subscribers.splice(subscriberIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: {
        message: 'Subscription deleted successfully',
        deletedSubscriber: {
          id: removedSubscriber.id,
          email: removedSubscriber.email
        }
      }
    })
  } catch (error) {
    console.error('Delete subscription API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete subscription' 
      },
      { status: 500 }
    )
  }
}
