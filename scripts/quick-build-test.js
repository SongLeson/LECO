#!/usr/bin/env node

const { execSync } = require('child_process')

console.log('🧪 Quick build test...')

try {
  console.log('🧹 Cleaning...')
  execSync('npm run clean', { stdio: 'inherit' })
  
  console.log('🔨 Building...')
  execSync('npm run build', { stdio: 'inherit' })
  
  console.log('✅ Build successful!')
  
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}
