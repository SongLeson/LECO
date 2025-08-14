# LECO 官网部署指南

## 🚀 部署方式

### 1. GitHub Pages 部署 (推荐)

#### 自动部署
1. 将代码推送到 GitHub 仓库的 `main` 或 `master` 分支
2. GitHub Actions 会自动构建和部署网站
3. 部署完成后，网站将在 `https://username.github.io/repository-name` 可访问

#### 手动部署
```bash
# 1. 构建项目
npm run build

# 2. 部署到 GitHub Pages
npm run deploy
```

### 2. Vercel 部署

1. 在 [Vercel](https://vercel.com) 创建账户
2. 连接 GitHub 仓库
3. 选择 Next.js 框架
4. 点击部署

### 3. Netlify 部署

1. 在 [Netlify](https://netlify.com) 创建账户
2. 连接 GitHub 仓库
3. 构建命令: `npm run build`
4. 发布目录: `out`

## 📋 部署前检查清单

### 必要配置
- [x] `next.config.js` 已配置静态导出
- [x] 图片优化已禁用 (GitHub Pages 兼容)
- [x] 所有图片路径使用相对路径
- [x] 环境变量已配置
- [x] SEO 元数据已完善

### 性能优化
- [x] 图片懒加载已启用
- [x] 代码分割已配置
- [x] 缓存策略已设置
- [x] 压缩已启用

### SEO 优化
- [x] Sitemap.xml 已生成
- [x] Robots.txt 已配置
- [x] 结构化数据已添加
- [x] Open Graph 标签已设置
- [x] Favicon 已配置

## 🔧 环境变量配置

### 开发环境 (.env.local)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 生产环境
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

## 📊 性能监控

### Core Web Vitals 目标
- **FCP (First Contentful Paint)**: < 1.8s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 监控工具
- Google PageSpeed Insights
- Lighthouse
- Web Vitals Chrome 扩展
- 内置性能监控组件 (开发环境)

## 🛠️ 构建命令

```bash
# 开发环境
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 静态导出 (GitHub Pages)
npm run export

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 📁 构建输出

```
out/
├── _next/           # Next.js 静态资源
├── images/          # 图片资源
├── api/            # API 路由 (静态化)
├── index.html      # 主页
├── sitemap.xml     # 站点地图
├── robots.txt      # 爬虫配置
└── ...             # 其他页面
```

## 🔍 故障排除

### 常见问题

1. **图片不显示**
   - 检查图片路径是否正确
   - 确保使用相对路径
   - 验证图片文件是否存在

2. **CSS 样式丢失**
   - 检查 `next.config.js` 配置
   - 确保 `trailingSlash: true`
   - 验证 CSS 文件路径

3. **JavaScript 错误**
   - 检查浏览器控制台
   - 验证 API 路径配置
   - 确保所有依赖已安装

4. **SEO 问题**
   - 验证 meta 标签
   - 检查 sitemap.xml 生成
   - 确认 robots.txt 配置

### 调试命令

```bash
# 检查构建输出
npm run build && ls -la out/

# 本地预览构建结果
npx serve out

# 分析包大小
npm run analyze

# 检查 TypeScript 错误
npm run type-check
```

## 📈 部署后优化

### 1. CDN 配置
- 配置 CloudFlare 或其他 CDN
- 启用 Gzip/Brotli 压缩
- 设置适当的缓存策略

### 2. 域名配置
- 配置自定义域名
- 启用 HTTPS
- 设置 DNS 记录

### 3. 监控设置
- 配置 Google Analytics
- 设置错误监控 (Sentry)
- 启用性能监控

### 4. SEO 提交
- 提交到 Google Search Console
- 提交到百度站长工具
- 配置站点地图

## 🔐 安全配置

### HTTP 头部安全
```javascript
// next.config.js 中已配置
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

### 内容安全策略 (CSP)
建议在服务器或 CDN 级别配置 CSP 头部。

## 📞 支持

如果在部署过程中遇到问题，请：

1. 检查 GitHub Actions 日志
2. 查看浏览器开发者工具
3. 参考 Next.js 官方文档
4. 联系开发团队

---

**部署成功后，LECO 官网将为用户提供极致的运动品牌体验！** 🏃‍♂️💨
