#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Preparing for GitHub Pages deployment...')

// 确保out目录存在
const outDir = path.join(process.cwd(), 'out')
if (!fs.existsSync(outDir)) {
  console.error('❌ out directory not found. Please run "npm run build" first.')
  process.exit(1)
}

// 创建.nojekyll文件
const nojekyllPath = path.join(outDir, '.nojekyll')
fs.writeFileSync(nojekyllPath, '')
console.log('✅ Created .nojekyll file')

// 检查关键文件
const indexPath = path.join(outDir, 'index.html')
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in out directory')
  process.exit(1)
}

// 检查_next目录
const nextDir = path.join(outDir, '_next')
if (!fs.existsSync(nextDir)) {
  console.error('❌ _next directory not found in out directory')
  process.exit(1)
}

console.log('✅ All required files found')

// 创建404.html（GitHub Pages需要）
const notFoundPath = path.join(outDir, '404.html')
if (!fs.existsSync(notFoundPath)) {
  fs.copyFileSync(indexPath, notFoundPath)
  console.log('✅ Created 404.html')
}

// 检查文件大小
const stats = fs.statSync(indexPath)
console.log(`📊 index.html size: ${(stats.size / 1024).toFixed(2)} KB`)

console.log('🎉 GitHub Pages deployment preparation complete!')
console.log('📁 Files in out directory:')

// 列出out目录的内容
const files = fs.readdirSync(outDir)
files.forEach(file => {
  const filePath = path.join(outDir, file)
  const stat = fs.statSync(filePath)
  const type = stat.isDirectory() ? '📁' : '📄'
  console.log(`  ${type} ${file}`)
})

console.log('\n🔗 Next steps:')
console.log('1. Commit and push your changes')
console.log('2. GitHub Actions will automatically deploy to GitHub Pages')
console.log('3. Check your repository settings > Pages to ensure GitHub Actions is selected')
