'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ArrowRight, Trophy, Target } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  type: 'competition' | 'training' | 'workshop' | 'exhibition'
  status: 'upcoming' | 'ongoing' | 'completed'
  participants: number
  maxParticipants: number
  image: string
  tags: string[]
  registrationDeadline: string
  price: number
  highlights: string[]
}

const EventsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Mock活动数据
  const events: Event[] = [
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
      ]
    }
  ]

  const eventTypes = [
    { id: 'all', name: '全部活动', icon: Target },
    { id: 'competition', name: '竞技比赛', icon: Trophy },
    { id: 'training', name: '训练营', icon: Users },
    { id: 'workshop', name: '工坊体验', icon: Calendar },
  ]

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter)

  // 计算倒计时
  const getTimeUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    const diff = eventDate.getTime() - now.getTime()
    
    if (diff <= 0) return null
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return { days, hours, minutes }
  }

  // 处理报名
  const handleRegister = (event: Event) => {
    console.log('报名活动:', event.title)
    // 这里可以添加报名逻辑
  }

  return (
    <section 
      id="events"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-black via-leco-gray to-leco-black relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-leco-electric-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-leco-plasma-purple/5 rounded-full blur-3xl"></div>
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
                '0 0 20px rgba(0, 229, 255, 0.3)',
                '0 0 40px rgba(139, 0, 255, 0.3)',
                '0 0 20px rgba(0, 229, 255, 0.3)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="px-6 py-2 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple text-leco-black font-bold rounded-full text-sm uppercase tracking-wider">
              EVENTS & COMPETITIONS
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
            <span className="text-gradient">活动</span>
            <span className="text-white"> & </span>
            <span className="text-gradient">赛事</span>
          </h2>
          
          <p className="text-xl text-leco-silver max-w-3xl mx-auto leading-relaxed">
            参与LECO精心策划的各类活动和赛事，挑战自我，突破极限，与志同道合的伙伴一起创造非凡体验
          </p>
        </motion.div>

        {/* 筛选器 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {eventTypes.map((type, index) => {
            const IconComponent = type.icon
            return (
              <motion.button
                key={type.id}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === type.id
                    ? 'bg-leco-electric-blue text-leco-black shadow-lg shadow-leco-electric-blue/30'
                    : 'bg-leco-gray border border-leco-carbon text-leco-silver hover:border-leco-electric-blue hover:text-leco-electric-blue'
                }`}
                onClick={() => setActiveFilter(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              >
                <IconComponent size={20} />
                <span>{type.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* 活动网格 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredEvents.map((event, index) => {
            const countdown = getTimeUntilEvent(event.date)
            const participationRate = (event.participants / event.maxParticipants) * 100
            
            return (
              <motion.div
                key={event.id}
                className="group bg-leco-gray rounded-2xl overflow-hidden border border-leco-carbon hover:border-leco-electric-blue/50 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                whileHover={{ y: -10 }}
              >
                {/* 活动图片 */}
                <div className="relative h-48 bg-gradient-to-br from-leco-electric-blue to-leco-plasma-purple overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-display font-black text-leco-black opacity-20">
                      LECO
                    </div>
                  </div>
                  
                  {/* 活动类型标签 */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.type === 'competition' ? 'bg-leco-energy-orange text-leco-black' :
                      event.type === 'training' ? 'bg-leco-neon-green text-leco-black' :
                      event.type === 'workshop' ? 'bg-leco-plasma-purple text-white' :
                      'bg-leco-electric-blue text-leco-black'
                    }`}>
                      {event.type === 'competition' ? '竞技比赛' :
                       event.type === 'training' ? '训练营' :
                       event.type === 'workshop' ? '工坊体验' : '展览'}
                    </span>
                  </div>

                  {/* 价格标签 */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-leco-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {event.price === 0 ? '免费' : `¥${event.price}`}
                    </span>
                  </div>
                </div>

                {/* 活动信息 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-leco-electric-blue transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-leco-silver text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* 活动详情 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-leco-silver">
                      <Calendar size={16} className="text-leco-electric-blue" />
                      <span>{event.date} {event.endDate && `- ${event.endDate}`}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-leco-silver">
                      <MapPin size={16} className="text-leco-electric-blue" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-leco-silver">
                      <Users size={16} className="text-leco-electric-blue" />
                      <span>{event.participants}/{event.maxParticipants} 人参与</span>
                    </div>
                  </div>

                  {/* 参与度进度条 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-leco-silver mb-1">
                      <span>报名进度</span>
                      <span>{participationRate.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-leco-carbon rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-leco-electric-blue to-leco-neon-green h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${participationRate}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 + 1 }}
                      />
                    </div>
                  </div>

                  {/* 倒计时 */}
                  {countdown && (
                    <div className="bg-leco-carbon rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-leco-electric-blue">{countdown.days}</div>
                          <div className="text-xs text-leco-silver">天</div>
                        </div>
                        <div className="text-leco-electric-blue">:</div>
                        <div>
                          <div className="text-lg font-bold text-leco-electric-blue">{countdown.hours}</div>
                          <div className="text-xs text-leco-silver">时</div>
                        </div>
                        <div className="text-leco-electric-blue">:</div>
                        <div>
                          <div className="text-lg font-bold text-leco-electric-blue">{countdown.minutes}</div>
                          <div className="text-xs text-leco-silver">分</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-leco-electric-blue hover:bg-leco-neon-blue text-leco-black font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRegister(event)}
                    >
                      <span>立即报名</span>
                      <ArrowRight size={16} />
                    </motion.button>
                    
                    <motion.button
                      className="px-4 py-3 border border-leco-electric-blue text-leco-electric-blue hover:bg-leco-electric-blue hover:text-leco-black rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      详情
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* 查看更多按钮 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple text-leco-black font-bold rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>查看所有活动</span>
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

export default EventsSection
