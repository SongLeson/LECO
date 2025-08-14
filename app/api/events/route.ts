// 活动赛事API路由

import { NextRequest, NextResponse } from 'next/server'

// Mock活动数据
const mockEvents = [
  {
    id: '1',
    title: 'LECO 极限挑战赛 2024',
    description: '年度最具挑战性的综合运动赛事，测试你的极限潜能',
    date: '2024-03-15',
    endDate: '2024-03-17',
    location: '北京奥林匹克公园',
    type: 'competition',
    status: 'upcoming',
    participants: 1250,
    maxParticipants: 2000,
    image: '/images/events/extreme-challenge.jpg',
    tags: ['极限运动', '挑战赛', '奖金丰厚'],
    registrationDeadline: '2024-03-01',
    price: 299,
    highlights: [
      '总奖金池100万元',
      '专业教练指导',
      '全程直播',
      '限量纪念品'
    ],
    organizer: 'LECO运动',
    contact: 'events@leco.com',
    requirements: [
      '年满18周岁',
      '身体健康，无重大疾病',
      '具备基础运动能力',
      '签署安全协议'
    ]
  },
  {
    id: '2',
    title: 'LECO 青少年训练营',
    description: '专为青少年设计的专业运动训练营，培养未来体育明星',
    date: '2024-02-20',
    endDate: '2024-02-25',
    location: '上海体育学院',
    type: 'training',
    status: 'upcoming',
    participants: 180,
    maxParticipants: 200,
    image: '/images/events/youth-camp.jpg',
    tags: ['青少年', '训练营', '专业指导'],
    registrationDeadline: '2024-02-10',
    price: 1299,
    highlights: [
      '专业教练团队',
      '个性化训练方案',
      '营养膳食指导',
      '结业证书'
    ],
    organizer: 'LECO运动',
    contact: 'training@leco.com',
    requirements: [
      '年龄12-18周岁',
      '家长同意书',
      '健康体检报告',
      '运动保险'
    ]
  },
  {
    id: '3',
    title: 'LECO 装备体验工坊',
    description: '最新运动装备试用体验，与产品设计师面对面交流',
    date: '2024-02-10',
    location: 'LECO 北京旗舰店',
    type: 'workshop',
    status: 'upcoming',
    participants: 45,
    maxParticipants: 50,
    image: '/images/events/equipment-workshop.jpg',
    tags: ['装备体验', '产品试用', '设计师交流'],
    registrationDeadline: '2024-02-08',
    price: 0,
    highlights: [
      '免费参与',
      '新品抢先体验',
      '设计师分享',
      '专属折扣'
    ],
    organizer: 'LECO产品部',
    contact: 'products@leco.com',
    requirements: [
      '运动爱好者',
      '提前预约',
      '携带身份证',
      '准时参加'
    ]
  },
  {
    id: '4',
    title: 'LECO 城市马拉松',
    description: '穿越城市地标的马拉松赛事，感受城市与运动的完美结合',
    date: '2024-04-21',
    location: '深圳市中心',
    type: 'competition',
    status: 'upcoming',
    participants: 3200,
    maxParticipants: 5000,
    image: '/images/events/city-marathon.jpg',
    tags: ['马拉松', '城市跑', '全民参与'],
    registrationDeadline: '2024-04-01',
    price: 199,
    highlights: [
      '城市地标路线',
      '专业计时芯片',
      '完赛奖牌',
      '补给站服务'
    ],
    organizer: 'LECO运动 & 深圳市体育局',
    contact: 'marathon@leco.com',
    requirements: [
      '年满16周岁',
      '马拉松经验优先',
      '健康证明',
      '意外保险'
    ]
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredEvents = [...mockEvents]

    // 类型筛选
    if (type && type !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.type === type)
    }

    // 状态筛选
    if (status) {
      filteredEvents = filteredEvents.filter(event => event.status === status)
    }

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        events: paginatedEvents,
        pagination: {
          page,
          limit,
          total: filteredEvents.length,
          totalPages: Math.ceil(filteredEvents.length / limit),
          hasNext: endIndex < filteredEvents.length,
          hasPrev: page > 1,
        }
      }
    })
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch events' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventId, userInfo } = body

    // 验证必要字段
    if (!eventId || !userInfo) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      )
    }

    // 查找活动
    const event = mockEvents.find(e => e.id === eventId)
    if (!event) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Event not found' 
        },
        { status: 404 }
      )
    }

    // 检查报名是否已满
    if (event.participants >= event.maxParticipants) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Event is full' 
        },
        { status: 400 }
      )
    }

    // 检查报名截止时间
    const deadline = new Date(event.registrationDeadline)
    const now = new Date()
    if (now > deadline) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Registration deadline has passed' 
        },
        { status: 400 }
      )
    }

    // 模拟报名处理
    console.log('Event registration:', { eventId, userInfo })

    // 更新参与人数（在实际应用中，这应该在数据库中处理）
    event.participants += 1

    return NextResponse.json({
      success: true,
      data: {
        message: 'Registration successful',
        eventId,
        registrationId: `REG_${Date.now()}`,
        event: {
          title: event.title,
          date: event.date,
          location: event.location,
          price: event.price
        }
      }
    })
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Registration failed' 
      },
      { status: 500 }
    )
  }
}
