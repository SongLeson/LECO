# LECO Sports Website - Setup Guide 🚀

## 🎯 Quick Start

Follow these steps to get your LECO Sports website running locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. View Your Website

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
LECO/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage component
├── components/            # React components
│   ├── BrandPhilosophy.tsx  # Brand values section
│   ├── Footer.tsx          # Footer with newsletter
│   ├── HeroSection.tsx     # Full-screen hero section
│   ├── Navigation.tsx      # Animated navigation bar
│   ├── ProductShowcase.tsx # Product carousel
│   ├── SocialHub.tsx       # Social media feed
│   └── SportsCinema.tsx    # Video player section
├── utils/                 # Utility functions
│   └── smoothScroll.ts    # Smooth scrolling setup
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🎨 Key Features Implemented

### ✅ Hero Section
- Full-screen video background
- Animated LECO logo with gradient text
- Particle effect animations
- Call-to-action buttons with hover effects

### ✅ Navigation
- Fixed header with glass morphism
- Smooth scroll navigation
- Mobile responsive menu
- Logo animation with status indicator

### ✅ Product Showcase
- Interactive product carousel
- Category filtering system
- Hover animations and card effects
- Product color selection

### ✅ Brand Philosophy
- Three core values: Speed, Precision, Breakthrough
- Parallax scrolling effects
- Animated icons and floating elements
- Split-screen layout design

### ✅ Sports Cinema
- Video playlist with custom controls
- Event statistics and metrics
- Platform switching functionality
- Full-screen video experience

### ✅ Social Hub
- Social media feed simulation
- Platform filtering (Instagram, Twitter, TikTok)
- Engagement metrics display
- Hashtag integration

### ✅ Footer
- Newsletter subscription
- Social media links
- Contact information
- Back-to-top functionality

## 🎨 Color System

The website uses a carefully crafted color palette:

- **Primary**: Electric Blue (`#00D4FF`)
- **Secondary**: Neon Green (`#39FF14`)
- **Accent**: Racing Orange (`#FF6B00`)
- **Premium**: Plasma Purple (`#8B00FF`)
- **Background**: Deep Space Black (`#0A0A0A`)

## 🚀 Performance Features

- **Next.js 14** with App Router for optimal performance
- **Framer Motion** for smooth animations
- **TailwindCSS** for efficient styling
- **TypeScript** for type safety
- **Responsive design** for all devices
- **Optimized images** and lazy loading

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Laptops** (1024px+)
- **Desktop** (1280px+)
- **Large screens** (1920px+)

## 🎬 Animation Highlights

- **Scroll-triggered animations** with Framer Motion
- **Parallax effects** for immersive experience
- **Hover micro-interactions** on all interactive elements
- **Loading animations** for better UX
- **Smooth scrolling** with Lenis library

## 🛠 Customization

### Update Colors
Edit `tailwind.config.js` to modify the LECO brand colors.

### Add Content
Update component files in the `/components/` directory.

### Modify Animations
Adjust animation parameters in component files or `globals.css`.

### Add New Sections
Create new components and import them in `page.tsx`.

## 🎯 Next Steps

1. **Add real content**: Replace placeholder text and images
2. **Integrate CMS**: Connect to a content management system
3. **Add e-commerce**: Implement shopping cart functionality
4. **Performance testing**: Run Lighthouse audits
5. **SEO optimization**: Add meta tags and structured data

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
The project is optimized for Vercel deployment. Simply connect your GitHub repository to Vercel for automatic deployments.

## 🎉 Congratulations!

You now have a fully functional, modern sports brand website that showcases:
- ⚡ High-performance animations
- 🎨 Stunning visual design
- 📱 Responsive layouts
- 🚀 Modern web technologies

**Ready to move beyond limits with LECO Sports!**
