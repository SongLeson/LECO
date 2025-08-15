'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, User, ArrowRight, Tag, Clock, Eye } from 'lucide-react'
import Image from 'next/image'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: number
  views: number
  category: string
  tags: string[]
  image: string
  featured: boolean
}

const NewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [activeCategory, setActiveCategory] = useState('all')

  // Mock新闻数据
  const articles: NewsArticle[] = [
    {
      id: '1',
      title: 'LECO 2024春季新品发布：突破科技边界的运动装备',
      excerpt: '全新的材料科技与人体工学设计完美结合，为运动员带来前所未有的性能体验。',
      content: '详细内容...',
      author: 'LECO设计团队',
      publishDate: '2024-01-15',
      readTime: 5,
      views: 2340,
      category: 'product',
      tags: ['新品发布', '科技创新', '运动装备'],
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '2',
      title: '专业训练指南：如何制定个人化的运动计划',
      excerpt: '资深教练分享专业训练经验，帮助你制定最适合自己的运动计划。',
      content: '详细内容...',
      author: '李教练',
      publishDate: '2024-01-12',
      readTime: 8,
      views: 1890,
      category: 'training',
      tags: ['训练指南', '个人化', '专业建议'],
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: '3',
      title: 'LECO运动员在国际赛事中再创佳绩',
      excerpt: '我们的签约运动员在最近的国际比赛中表现出色，为品牌赢得了更多荣誉。',
      content: '详细内容...',
      author: 'LECO新闻部',
      publishDate: '2024-01-10',
      readTime: 3,
      views: 3120,
      category: 'news',
      tags: ['运动员', '国际赛事', '佳绩'],
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: '4',
      title: '运动营养学：如何通过饮食提升运动表现',
      excerpt: '营养专家详解运动前后的饮食搭配，让你的训练效果事半功倍。',
      content: '详细内容...',
      author: '营养师王医生',
      publishDate: '2024-01-08',
      readTime: 6,
      views: 1560,
      category: 'health',
      tags: ['运动营养', '饮食搭配', '健康'],
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: '5',
      title: '可持续发展：LECO的环保承诺与行动',
      excerpt: '了解LECO在可持续发展方面的努力，以及我们如何通过创新减少环境影响。',
      content: '详细内容...',
      author: 'LECO可持续发展部',
      publishDate: '2024-01-05',
      readTime: 4,
      views: 980,
      category: 'sustainability',
      tags: ['可持续发展', '环保', '企业责任'],
      image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false
    },
    {
      id: '6',
      title: '科技前沿：AI在运动训练中的应用',
      excerpt: '探索人工智能如何革命性地改变运动训练方式，提升训练效率。',
      content: '详细内容...',
      author: 'LECO技术团队',
      publishDate: '2024-01-03',
      readTime: 7,
      views: 2100,
      category: 'technology',
      tags: ['人工智能', '运动训练', '科技创新'],
      image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    }
  ]

  const categories = [
    { id: 'all', name: '全部资讯', color: 'from-leco-electric-blue to-leco-neon-blue' },
    { id: 'product', name: '产品动态', color: 'from-leco-energy-orange to-leco-energy-orange' },
    { id: 'training', name: '训练指南', color: 'from-leco-neon-green to-leco-neon-green' },
    { id: 'news', name: '品牌新闻', color: 'from-leco-plasma-purple to-leco-plasma-purple' },
    { id: 'health', name: '健康资讯', color: 'from-leco-electric-blue to-leco-plasma-purple' },
    { id: 'technology', name: '科技前沿', color: 'from-leco-energy-orange to-leco-plasma-purple' },
  ]

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  const handleReadMore = (articleId: string) => {
    console.log('阅读文章:', articleId)
    // 这里可以跳转到文章详情页
    window.location.href = `/news/${articleId}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section 
      id="news"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-black via-leco-gray to-leco-black relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 bg-leco-plasma-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-leco-electric-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="sport-container relative z-10">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              boxShadow: [
                '0 0 20px rgba(139, 0, 255, 0.3)',
                '0 0 40px rgba(0, 229, 255, 0.3)',
                '0 0 20px rgba(139, 0, 255, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="px-6 py-2 bg-gradient-to-r from-leco-plasma-purple to-leco-electric-blue text-white font-bold rounded-full text-sm uppercase tracking-wider">
              NEWS & INSIGHTS
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            <span className="text-gradient">资讯</span>
            <span className="text-white"> & </span>
            <span className="text-gradient">洞察</span>
          </h2>
          
          <p className="text-xl text-leco-silver max-w-3xl mx-auto leading-relaxed">
            获取最新的运动资讯、专业训练指导和品牌动态，与LECO一起探索运动的无限可能
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-leco-black shadow-lg`
                  : 'bg-leco-gray border border-leco-carbon text-leco-silver hover:border-leco-electric-blue hover:text-leco-electric-blue'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 特色文章 */}
        {activeCategory === 'all' && featuredArticles.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">特色推荐</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <motion.article
                  key={article.id}
                  className="group bg-leco-gray rounded-2xl overflow-hidden border border-leco-carbon hover:border-leco-electric-blue/50 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  {/* 文章图片 */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* 渐变覆盖层 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-leco-black/60 via-transparent to-transparent" />
                    
                    {/* 特色标签 */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-leco-energy-orange text-leco-black px-3 py-1 rounded-full text-xs font-bold">
                        特色推荐
                      </span>
                    </div>

                    {/* 分类标签 */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-leco-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find(cat => cat.id === article.category)?.name}
                      </span>
                    </div>
                  </div>

                  {/* 文章内容 */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-leco-electric-blue transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h4>
                    
                    <p className="text-leco-silver text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* 文章元信息 */}
                    <div className="flex items-center justify-between text-xs text-leco-dark-silver mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{article.readTime}分钟</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="flex items-center space-x-1 bg-leco-carbon text-leco-silver px-2 py-1 rounded-full text-xs"
                        >
                          <Tag size={10} />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* 阅读更多按钮 */}
                    <motion.button
                      className="w-full bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleReadMore(article.id)}
                    >
                      <span>阅读全文</span>
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* 常规文章列表 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {(activeCategory === 'all' ? regularArticles : filteredArticles).map((article, index) => (
            <motion.article
              key={article.id}
              className="group bg-leco-gray rounded-xl overflow-hidden border border-leco-carbon hover:border-leco-electric-blue/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
              whileHover={{ y: -5 }}
            >
              {/* 文章图片 */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* 渐变覆盖层 */}
                <div className="absolute inset-0 bg-gradient-to-t from-leco-black/40 via-transparent to-transparent" />
                
                {/* 分类标签 */}
                <div className="absolute top-3 right-3">
                  <span className="bg-leco-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>
              </div>

              {/* 文章内容 */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-leco-electric-blue transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h4>
                
                <p className="text-leco-silver text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* 文章元信息 */}
                <div className="flex items-center justify-between text-xs text-leco-dark-silver mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{formatDate(article.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{article.readTime}min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>

                {/* 阅读更多按钮 */}
                <motion.button
                  className="w-full border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReadMore(article.id)}
                >
                  <span>阅读更多</span>
                  <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* 查看更多按钮 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-leco-plasma-purple to-leco-electric-blue text-white font-bold rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>查看更多资讯</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </span>
            
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsSection
