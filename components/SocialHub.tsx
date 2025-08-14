'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, Twitter, Youtube, Heart, MessageCircle, Share2, Verified } from 'lucide-react'

interface SocialPost {
  id: number
  platform: 'instagram' | 'twitter' | 'tiktok'
  author: string
  handle: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  isVerified: boolean
  hashtags: string[]
}

const SocialHub = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [activeFilter, setActiveFilter] = useState('all')

  const socialPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'instagram',
      author: 'Alex Rodriguez',
      handle: '@alexr_athlete',
      avatar: '/images/avatars/alex.jpg',
      content: 'Just crushed my personal best with the new LECO Velocity Pro X1! These shoes are absolutely game-changing 🔥',
      image: '/images/social/post-1.jpg',
      likes: 2845,
      comments: 156,
      shares: 89,
      timestamp: '2h',
      isVerified: true,
      hashtags: ['LECOMovement', 'VelocityPro', 'PersonalBest']
    },
    {
      id: 2,
      platform: 'twitter',
      author: 'Sarah Chen',
      handle: '@sarahc_runs',
      avatar: '/images/avatars/sarah.jpg',
      content: 'Training session complete! The LECO gear keeps me pushing beyond my limits every single day. #LECOMovement #TrainingDay',
      likes: 1456,
      comments: 78,
      shares: 234,
      timestamp: '4h',
      isVerified: false,
      hashtags: ['LECOMovement', 'TrainingDay', 'NeverSettle']
    },
    {
      id: 3,
      platform: 'instagram',
      author: 'Marcus Johnson',
      handle: '@marcusj_basketball',
      avatar: '/images/avatars/marcus.jpg',
      content: 'Court session in the new LECO gear. The precision and comfort are unmatched! 🏀',
      image: '/images/social/post-3.jpg',
      likes: 3267,
      comments: 189,
      shares: 145,
      timestamp: '6h',
      isVerified: true,
      hashtags: ['LECOMovement', 'Basketball', 'GameTime']
    },
    {
      id: 4,
      platform: 'twitter',
      author: 'Emma Wilson',
      handle: '@emmaw_fitness',
      avatar: '/images/avatars/emma.jpg',
      content: 'Another amazing workout with LECO! The performance tech in these clothes is incredible. Feeling unstoppable! 💪',
      likes: 987,
      comments: 45,
      shares: 67,
      timestamp: '8h',
      isVerified: false,
      hashtags: ['LECOMovement', 'Fitness', 'Unstoppable']
    },
    {
      id: 5,
      platform: 'instagram',
      author: 'David Park',
      handle: '@davidp_runner',
      avatar: '/images/avatars/david.jpg',
      content: 'Marathon prep with LECO! These shoes are built for distance and speed. Ready to break records! 🏃‍♂️',
      image: '/images/social/post-5.jpg',
      likes: 1876,
      comments: 92,
      shares: 76,
      timestamp: '12h',
      isVerified: true,
      hashtags: ['LECOMovement', 'Marathon', 'RunningGoals']
    },
    {
      id: 6,
      platform: 'twitter',
      author: 'Zoe Martinez',
      handle: '@zoem_CrossFit',
      avatar: '/images/avatars/zoe.jpg',
      content: 'CrossFit WOD crushed! LECO gear handles everything I throw at it. Built for champions! #LECOMovement #CrossFit',
      likes: 2156,
      comments: 134,
      shares: 98,
      timestamp: '1d',
      isVerified: false,
      hashtags: ['LECOMovement', 'CrossFit', 'Champions']
    }
  ]

  const platforms = [
    { id: 'all', name: 'ALL POSTS', icon: Share2 },
    { id: 'instagram', name: 'INSTAGRAM', icon: Instagram },
    { id: 'twitter', name: 'TWITTER', icon: Twitter },
    { id: 'tiktok', name: 'TIKTOK', icon: Youtube },
  ]

  const filteredPosts = activeFilter === 'all' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === activeFilter)

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'leco-purple'
      case 'twitter': return 'leco-blue'
      case 'tiktok': return 'leco-orange'
      default: return 'leco-green'
    }
  }

  return (
    <section
      id="social"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-gray to-leco-black"
    >
      <div className="sport-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SOCIAL
            <span className="block">MOVEMENT</span>
          </motion.h2>
          <motion.p
            className="text-xl text-leco-silver max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join the global community of athletes pushing beyond limits. 
            Share your journey with #LECOMovement and inspire others to excel.
          </motion.p>
        </motion.div>

        {/* Platform Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {platforms.map((platform, index) => (
            <motion.button
              key={platform.id}
              className={`flex items-center space-x-2 px-6 py-3 font-bold tracking-wide 
                         rounded-lg transition-all duration-300 ${
                activeFilter === platform.id
                  ? 'bg-gradient-to-r from-leco-blue to-leco-green text-leco-black'
                  : 'bg-leco-carbon text-white hover:bg-leco-blue hover:text-leco-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(platform.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <platform.icon size={18} />
              <span>{platform.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Social Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              className="glass-card p-6 group card-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            >
              {/* Post Header */}
              <div className="flex items-center space-x-3 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-leco-blue to-leco-green 
                                flex items-center justify-center text-leco-black font-bold text-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-white">{post.author}</h4>
                    {post.isVerified && (
                      <Verified size={16} className="text-leco-blue" />
                    )}
                  </div>
                  <p className="text-leco-silver text-sm">{post.handle}</p>
                </div>

                {/* Platform Icon */}
                <div className={`p-2 rounded-full bg-${getPlatformColor(post.platform)}/20`}>
                  {post.platform === 'instagram' && <Instagram size={16} className={`text-${getPlatformColor(post.platform)}`} />}
                  {post.platform === 'twitter' && <Twitter size={16} className={`text-${getPlatformColor(post.platform)}`} />}
                  {post.platform === 'tiktok' && <Youtube size={16} className={`text-${getPlatformColor(post.platform)}`} />}
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-white leading-relaxed mb-3">
                  {post.content}
                </p>
                
                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((hashtag, hashIndex) => (
                    <span
                      key={hashIndex}
                      className={`text-${getPlatformColor(post.platform)} text-sm hover:underline cursor-pointer`}
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-leco-carbon to-leco-gray 
                                  flex items-center justify-center">
                    <div className="text-leco-silver text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-br 
                                      from-leco-blue to-leco-green flex items-center justify-center">
                        <Instagram size={24} className="text-leco-black" />
                      </div>
                      <p className="text-sm">Social Media Image</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-leco-carbon/50">
                <div className="flex items-center space-x-6">
                  <motion.button
                    className="flex items-center space-x-2 text-leco-silver hover:text-leco-orange 
                               transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={16} />
                    <span className="text-sm">{formatNumber(post.likes)}</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center space-x-2 text-leco-silver hover:text-leco-blue 
                               transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle size={16} />
                    <span className="text-sm">{formatNumber(post.comments)}</span>
                  </motion.button>
                  
                  <motion.button
                    className="flex items-center space-x-2 text-leco-silver hover:text-leco-green 
                               transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={16} />
                    <span className="text-sm">{formatNumber(post.shares)}</span>
                  </motion.button>
                </div>
                
                <span className="text-leco-silver text-sm">{post.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                JOIN THE MOVEMENT
              </h3>
              <p className="text-leco-silver">
                Share your story and inspire others with #LECOMovement
              </p>
            </div>
            
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-leco-blue to-leco-green 
                         text-leco-black font-bold rounded-lg hover:shadow-lg 
                         hover:shadow-leco-blue/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHARE YOUR STORY
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialHub
