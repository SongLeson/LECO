'use client'

import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    brand: [
      { name: 'About LECO', href: '#about' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
    ],
    products: [
      { name: 'Footwear', href: '#footwear' },
      { name: 'Apparel', href: '#apparel' },
      { name: 'Accessories', href: '#accessories' },
      { name: 'New Arrivals', href: '#new' },
    ],
    support: [
      { name: 'Customer Service', href: '#support' },
      { name: 'Size Guide', href: '#sizing' },
      { name: 'Returns', href: '#returns' },
      { name: 'Shipping Info', href: '#shipping' },
    ],
    connect: [
      { name: 'Newsletter', href: '#newsletter' },
      { name: 'Athletes', href: '#athletes' },
      { name: 'Community', href: '#community' },
      { name: 'Events', href: '#events' },
    ]
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'leco-purple' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'leco-blue' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'leco-orange' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'leco-blue' },
  ]

  return (
    <footer className="bg-gradient-to-b from-leco-black to-leco-gray border-t border-leco-carbon">
      <div className="sport-container">
        {/* Newsletter Section */}
        <motion.div
          className="py-16 border-b border-leco-carbon/50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.h3
              className="text-3xl font-display font-bold text-gradient mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              STAY AHEAD OF THE GAME
            </motion.h3>
            <motion.p
              className="text-leco-silver mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get exclusive access to new releases, athlete stories, and training tips. 
              Join our community of champions.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-leco-carbon border border-leco-carbon 
                           focus:border-leco-blue rounded-lg text-white placeholder-leco-silver 
                           focus:outline-none transition-colors duration-300"
              />
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-leco-blue to-leco-green 
                           text-leco-black font-bold rounded-lg hover:shadow-lg 
                           hover:shadow-leco-blue/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SUBSCRIBE
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <motion.div
                    className="text-4xl font-display font-black text-gradient"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                  >
                    LECO
                  </motion.div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-leco-green rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  />
                </div>
              </motion.div>

              <p className="text-leco-silver leading-relaxed max-w-md">
                Engineered for champions. Designed for breakthrough performance. 
                LECO is where athletic excellence meets cutting-edge innovation.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-leco-silver">
                  <Mail size={18} className="text-leco-blue" />
                  <span>hello@leco.com</span>
                </div>
                <div className="flex items-center space-x-3 text-leco-silver">
                  <Phone size={18} className="text-leco-green" />
                  <span>+1 (555) 123-LECO</span>
                </div>
                <div className="flex items-center space-x-3 text-leco-silver">
                  <MapPin size={18} className="text-leco-orange" />
                  <span>New York, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`p-3 rounded-full bg-leco-carbon hover:bg-${social.color} 
                               text-white hover:text-leco-black transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                className="space-y-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-white uppercase tracking-wide">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-leco-silver hover:text-leco-blue transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="py-8 border-t border-leco-carbon/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-leco-silver">
              <span>© 2024 LECO Sports. All rights reserved.</span>
              <motion.a
                href="#privacy"
                className="hover:text-leco-blue transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                className="hover:text-leco-blue transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#cookies"
                className="hover:text-leco-blue transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Cookie Policy
              </motion.a>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-gradient-to-r from-leco-blue to-leco-green 
                         text-leco-black hover:shadow-lg hover:shadow-leco-blue/50 
                         transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
