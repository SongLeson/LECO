// 新闻资讯API路由

import { NextRequest, NextResponse } from 'next/server'

// Mock新闻数据
const mockNews = [
  {
    id: '1',
    title: 'LECO 2024春季新品发布：突破科技边界的运动装备',
    excerpt: '全新的材料科技与人体工学设计完美结合，为运动员带来前所未有的性能体验。',
    content: `
      <h2>革命性的材料科技</h2>
      <p>LECO 2024春季新品系列采用了最新的纳米纤维技术，这种材料不仅轻盈透气，还具有出色的弹性和耐用性。经过严格的实验室测试，新材料的透气性比传统材料提升了40%，同时重量减轻了25%。</p>
      
      <h2>人体工学设计</h2>
      <p>我们的设计团队与运动科学专家合作，通过3D扫描和运动分析技术，为每一件产品都量身定制了最符合人体工学的设计。无论是跑步、训练还是日常穿着，都能提供最佳的舒适度和性能表现。</p>
      
      <h2>可持续发展承诺</h2>
      <p>新品系列还体现了LECO对可持续发展的承诺，所有产品都采用了环保材料和生产工艺，减少了30%的碳排放。</p>
    `,
    author: 'LECO设计团队',
    publishDate: '2024-01-15',
    readTime: 5,
    views: 2340,
    category: 'product',
    tags: ['新品发布', '科技创新', '运动装备'],
    image: '/images/news/spring-collection.jpg',
    featured: true,
    seo: {
      metaTitle: 'LECO 2024春季新品发布 - 突破科技边界的运动装备',
      metaDescription: '全新的材料科技与人体工学设计完美结合，为运动员带来前所未有的性能体验。',
      keywords: ['LECO', '新品发布', '运动装备', '科技创新']
    }
  },
  {
    id: '2',
    title: '专业训练指南：如何制定个人化的运动计划',
    excerpt: '资深教练分享专业训练经验，帮助你制定最适合自己的运动计划。',
    content: `
      <h2>了解你的身体状况</h2>
      <p>制定个人化运动计划的第一步是全面了解自己的身体状况。建议进行专业的体能测试，包括心肺功能、肌肉力量、柔韧性和身体成分分析。</p>
      
      <h2>设定明确的目标</h2>
      <p>明确的目标是成功训练的关键。无论是减重、增肌、提高耐力还是改善健康状况，都需要设定具体、可衡量、可达成的目标。</p>
      
      <h2>循序渐进的训练原则</h2>
      <p>训练强度和频率应该循序渐进地增加。初学者建议从每周3次、每次30分钟的中等强度训练开始，逐步增加到每周5-6次。</p>
    `,
    author: '李教练',
    publishDate: '2024-01-12',
    readTime: 8,
    views: 1890,
    category: 'training',
    tags: ['训练指南', '个人化', '专业建议'],
    image: '/images/news/training-guide.jpg',
    featured: false,
    seo: {
      metaTitle: '专业训练指南：如何制定个人化的运动计划 - LECO',
      metaDescription: '资深教练分享专业训练经验，帮助你制定最适合自己的运动计划。',
      keywords: ['训练指南', '运动计划', '个人化训练', '专业建议']
    }
  },
  {
    id: '3',
    title: 'LECO运动员在国际赛事中再创佳绩',
    excerpt: '我们的签约运动员在最近的国际比赛中表现出色，为品牌赢得了更多荣誉。',
    content: `
      <h2>突破性的表现</h2>
      <p>在刚刚结束的国际田径锦标赛中，LECO签约运动员张明以9.85秒的成绩打破了个人最好成绩，获得男子100米金牌。这是他职业生涯的重要里程碑。</p>
      
      <h2>装备的力量</h2>
      <p>张明在赛后采访中表示，LECO的专业跑鞋为他提供了完美的支撑和推进力，帮助他在关键时刻发挥出最佳水平。</p>
      
      <h2>团队的支持</h2>
      <p>除了优质的装备，LECO还为运动员提供了全方位的支持，包括营养指导、训练计划和心理辅导。</p>
    `,
    author: 'LECO新闻部',
    publishDate: '2024-01-10',
    readTime: 3,
    views: 3120,
    category: 'news',
    tags: ['运动员', '国际赛事', '佳绩'],
    image: '/images/news/athlete-achievement.jpg',
    featured: true,
    seo: {
      metaTitle: 'LECO运动员在国际赛事中再创佳绩 - 品牌新闻',
      metaDescription: '我们的签约运动员在最近的国际比赛中表现出色，为品牌赢得了更多荣誉。',
      keywords: ['LECO运动员', '国际赛事', '体育成绩', '品牌荣誉']
    }
  },
  {
    id: '4',
    title: '运动营养学：如何通过饮食提升运动表现',
    excerpt: '营养专家详解运动前后的饮食搭配，让你的训练效果事半功倍。',
    content: `
      <h2>运动前的营养准备</h2>
      <p>运动前2-3小时应该摄入富含碳水化合物的食物，为身体提供充足的能量。避免高脂肪和高纤维食物，以免影响消化。</p>
      
      <h2>运动中的补充</h2>
      <p>对于超过1小时的运动，需要及时补充水分和电解质。建议每15-20分钟补充150-250ml的运动饮料。</p>
      
      <h2>运动后的恢复</h2>
      <p>运动后30分钟内是营养补充的黄金时间，应该摄入蛋白质和碳水化合物的组合，比例约为1:3。</p>
    `,
    author: '营养师王医生',
    publishDate: '2024-01-08',
    readTime: 6,
    views: 1560,
    category: 'health',
    tags: ['运动营养', '饮食搭配', '健康'],
    image: '/images/news/sports-nutrition.jpg',
    featured: false,
    seo: {
      metaTitle: '运动营养学：如何通过饮食提升运动表现 - LECO健康',
      metaDescription: '营养专家详解运动前后的饮食搭配，让你的训练效果事半功倍。',
      keywords: ['运动营养', '饮食搭配', '运动表现', '健康饮食']
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    let filteredNews = [...mockNews]

    // 分类筛选
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(article => article.category === category)
    }

    // 特色文章筛选
    if (featured === 'true') {
      filteredNews = filteredNews.filter(article => article.featured)
    }

    // 搜索筛选
    if (search) {
      const searchLower = search.toLowerCase()
      filteredNews = filteredNews.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // 按发布日期排序
    filteredNews.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

    // 分页
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = filteredNews.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        articles: paginatedNews,
        pagination: {
          page,
          limit,
          total: filteredNews.length,
          totalPages: Math.ceil(filteredNews.length / limit),
          hasNext: endIndex < filteredNews.length,
          hasPrev: page > 1,
        }
      }
    })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news' 
      },
      { status: 500 }
    )
  }
}

// 获取单篇文章详情
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Article ID is required' 
        },
        { status: 400 }
      )
    }

    const article = mockNews.find(article => article.id === id)
    
    if (!article) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Article not found' 
        },
        { status: 404 }
      )
    }

    // 增加浏览量（在实际应用中，这应该在数据库中处理）
    article.views += 1

    return NextResponse.json({
      success: true,
      data: article
    })
  } catch (error) {
    console.error('Article detail error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch article' 
      },
      { status: 500 }
    )
  }
}
