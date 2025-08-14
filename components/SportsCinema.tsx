'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

interface SportEvent {
  id: number
  title: string
  subtitle: string
  duration: string
  thumbnail: string
  videoUrl: string
  category: 'running' | 'basketball' | 'football' | 'training'
  date: string
}

const SportsCinema = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const events: SportEvent[] = [
    {
      id: 1,
      title: "VELOCITY CHAMPIONSHIP",
      subtitle: "Breaking Records",
      duration: "2:45",
      thumbnail: "/images/events/running.jpg",
      videoUrl: "/videos/running-event.mp4",
      category: "running",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "URBAN LEAGUE FINALS",
      subtitle: "Street Basketball",
      duration: "3:20",
      thumbnail: "/images/events/basketball.jpg",
      videoUrl: "/videos/basketball-event.mp4",
      category: "basketball",
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "ELITE TRAINING SESSION",
      subtitle: "Behind the Scenes",
      duration: "4:10",
      thumbnail: "/images/events/training.jpg",
      videoUrl: "/videos/training-event.mp4",
      category: "training",
      date: "2024-01-25"
    },
    {
      id: 4,
      title: "CHAMPIONS LEAGUE",
      subtitle: "Football Excellence",
      duration: "5:30",
      thumbnail: "/images/events/football.jpg",
      videoUrl: "/videos/football-event.mp4",
      category: "football",
      date: "2024-02-01"
    }
  ]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const switchVideo = (index: number) => {
    setCurrentVideo(index)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const categoryColors = {
    running: 'leco-blue',
    basketball: 'leco-orange',
    football: 'leco-green',
    training: 'leco-purple'
  }

  return (
    <section
      id="cinema"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-leco-black to-leco-gray"
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
            SPORTS
            <span className="block">CINEMA</span>
          </motion.h2>
          <motion.p
            className="text-xl text-leco-silver max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Witness the moments that define champions. Experience the adrenaline 
            of elite competition and the dedication behind every victory.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-leco-carbon">
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                poster={events[currentVideo].thumbnail}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={events[currentVideo].videoUrl} type="video/mp4" />
              </video>

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-leco-black/60 via-transparent to-transparent" />

              {/* Video Controls */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 
                           transition-opacity duration-300 bg-leco-black/30"
                whileHover={{ opacity: 1 }}
              >
                <motion.button
                  className="p-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-leco-blue 
                             hover:text-leco-black transition-all duration-300"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </motion.button>
              </motion.div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-leco-blue 
                               hover:text-leco-black transition-all duration-300"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-leco-blue 
                               hover:text-leco-black transition-all duration-300"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm font-medium">
                    {events[currentVideo].duration}
                  </span>
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-leco-blue 
                                     hover:text-leco-black transition-all duration-300">
                    <Maximize size={16} />
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="absolute bottom-16 left-4 right-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold 
                                   bg-${categoryColors[events[currentVideo].category]} 
                                   text-leco-black uppercase tracking-wide`}>
                    {events[currentVideo].category}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {events[currentVideo].title}
                  </h3>
                  <p className="text-leco-silver">
                    {events[currentVideo].subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Video Playlist */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">EVENT HIGHLIGHTS</h3>
            
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  currentVideo === index
                    ? 'bg-gradient-to-r from-leco-blue/20 to-leco-green/20 border border-leco-blue'
                    : 'bg-leco-carbon hover:bg-leco-carbon/80 border border-transparent'
                }`}
                onClick={() => switchVideo(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-leco-gray flex-shrink-0">
                    <div className={`w-full h-full bg-gradient-to-br from-${categoryColors[event.category]} 
                                     to-${categoryColors[event.category]}/70 flex items-center justify-center`}>
                      <Play size={16} className="text-leco-black" />
                    </div>
                    {currentVideo === index && (
                      <div className="absolute inset-0 border-2 border-leco-blue rounded-lg" />
                    )}
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm truncate ${
                      currentVideo === index ? 'text-leco-blue' : 'text-white'
                    }`}>
                      {event.title}
                    </h4>
                    <p className="text-leco-silver text-xs truncate">
                      {event.subtitle}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full 
                                        bg-${categoryColors[event.category]}/20 
                                        text-${categoryColors[event.category]} font-medium`}>
                        {event.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-leco-silver">
                        {event.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Button */}
            <motion.button
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-leco-blue to-leco-green 
                         text-leco-black font-bold rounded-lg hover:shadow-lg 
                         hover:shadow-leco-blue/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              VIEW ALL EVENTS
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { label: 'Events Covered', value: '150+', color: 'leco-blue' },
            { label: 'Athletes Featured', value: '500+', color: 'leco-green' },
            { label: 'Hours of Content', value: '1,200+', color: 'leco-orange' },
            { label: 'Global Viewers', value: '2.5M+', color: 'leco-purple' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            >
              <motion.div
                className={`text-4xl font-display font-black text-${stat.color} mb-2`}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: index * 0.5 
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-leco-silver text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SportsCinema
