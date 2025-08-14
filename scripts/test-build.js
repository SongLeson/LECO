#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🧪 Testing Next.js build for GitHub Pages...')

try {
  // 清理之前的构建
  console.log('🧹 Cleaning previous build...')
  if (fs.existsSync('out')) {
    execSync('rm -rf out', { stdio: 'inherit' })
  }
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' })
  }

  // 构建项目
  console.log('🔨 Building project...')
  execSync('npm run build', { stdio: 'inherit' })

  // 检查构建输出
  const outDir = path.join(process.cwd(), 'out')
  if (!fs.existsSync(outDir)) {
    throw new Error('Build failed: out directory not found')
  }

  console.log('✅ Build successful!')

  // 检查关键文件
  const requiredFiles = [
    'index.html',
    '_next',
    'favicon.svg'
  ]

  console.log('🔍 Checking required files...')
  for (const file of requiredFiles) {
    const filePath = path.join(outDir, file)
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Warning: ${file} not found`)
    } else {
      console.log(`✅ ${file} found`)
    }
  }

  // 检查index.html内容
  const indexPath = path.join(outDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8')
    
    // 检查是否包含必要的内容
    const checks = [
      { name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i },
      { name: 'LECO title', pattern: /LECO/i },
      { name: 'Next.js scripts', pattern: /_next\/static/i },
      { name: 'CSS styles', pattern: /\.css/i }
    ]

    console.log('🔍 Checking index.html content...')
    for (const check of checks) {
      if (check.pattern.test(indexContent)) {
        console.log(`✅ ${check.name} found`)
      } else {
        console.warn(`⚠️  Warning: ${check.name} not found`)
      }
    }

    // 显示文件大小
    const stats = fs.statSync(indexPath)
    console.log(`📊 index.html size: ${(stats.size / 1024).toFixed(2)} KB`)
  }

  // 列出out目录内容
  console.log('📁 Build output contents:')
  const files = fs.readdirSync(outDir)
  files.forEach(file => {
    const filePath = path.join(outDir, file)
    const stat = fs.statSync(filePath)
    const type = stat.isDirectory() ? '📁' : '📄'
    const size = stat.isDirectory() ? '' : ` (${(stat.size / 1024).toFixed(2)} KB)`
    console.log(`  ${type} ${file}${size}`)
  })

  // 运行部署准备脚本
  console.log('🚀 Running deployment preparation...')
  execSync('node scripts/deploy-github-pages.js', { stdio: 'inherit' })

  console.log('\n🎉 Build test completed successfully!')
  console.log('🔗 To test locally, run: npx serve out')
  console.log('🚀 To deploy, commit and push your changes')

} catch (error) {
  console.error('❌ Build test failed:', error.message)
  process.exit(1)
}
