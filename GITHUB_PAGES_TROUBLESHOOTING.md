# 🔧 GitHub Pages 部署故障排除指南

## 🚨 问题：只显示logo然后黑屏

### 常见原因和解决方案

#### 1. **JavaScript文件加载失败**
**症状**: 页面显示logo但其他内容不加载
**原因**: GitHub Pages无法正确加载Next.js生成的JavaScript文件

**解决方案**:
```bash
# 1. 确保.nojekyll文件存在
touch public/.nojekyll

# 2. 重新构建和部署
npm run build
npm run deploy:github
```

#### 2. **路径配置问题**
**症状**: 资源文件404错误
**原因**: GitHub Pages的路径配置不正确

**解决方案**: 检查`next.config.js`配置
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true
  }
}
```

#### 3. **构建输出问题**
**症状**: 部署后页面空白
**原因**: 构建过程中出现错误

**解决方案**:
```bash
# 清理并重新构建
npm run clean
npm run build

# 检查构建输出
ls -la out/
```

### 🔍 调试步骤

#### 步骤1: 检查GitHub Actions日志
1. 访问你的GitHub仓库
2. 点击"Actions"标签
3. 查看最新的部署日志
4. 检查是否有构建错误

#### 步骤2: 检查GitHub Pages设置
1. 访问仓库设置 > Pages
2. 确保Source设置为"GitHub Actions"
3. 检查自定义域名设置（如果有）

#### 步骤3: 本地测试构建
```bash
# 本地构建测试
npm run build

# 检查out目录内容
ls -la out/

# 本地预览构建结果
npx serve out
```

#### 步骤4: 检查浏览器控制台
1. 打开GitHub Pages网站
2. 按F12打开开发者工具
3. 查看Console和Network标签
4. 检查是否有JavaScript错误或404错误

### 🛠️ 常见错误修复

#### 错误1: "_next文件夹404"
```bash
# 确保.nojekyll文件存在
echo "" > public/.nojekyll
npm run build
```

#### 错误2: "index.html空白"
```bash
# 检查是否有根目录index.html冲突
rm index.html  # 删除根目录的index.html
npm run build
```

#### 错误3: "JavaScript加载失败"
```javascript
// 检查next.config.js中的配置
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true }
}
```

### 📋 部署检查清单

- [ ] `.nojekyll`文件存在于`public/`目录
- [ ] `next.config.js`配置正确
- [ ] 没有根目录`index.html`冲突
- [ ] GitHub Actions工作流正常运行
- [ ] GitHub Pages设置为"GitHub Actions"
- [ ] 构建输出`out/`目录包含所有必要文件
- [ ] 浏览器控制台无JavaScript错误

### 🔗 有用的命令

```bash
# 完整的重新部署流程
npm run clean
npm run build
git add .
git commit -m "Fix GitHub Pages deployment"
git push

# 本地调试
npm run build
npx serve out

# 检查构建输出
npm run deploy:github
```

### 📞 获取帮助

如果问题仍然存在：

1. **检查GitHub Actions日志**获取详细错误信息
2. **在浏览器控制台**查看JavaScript错误
3. **比较本地构建**和GitHub Pages的差异
4. **检查网络请求**是否有404错误

### 🎯 预期结果

修复后，GitHub Pages应该：
- ✅ 正确显示完整的LECO网站
- ✅ 所有JavaScript功能正常工作
- ✅ 图片和样式正确加载
- ✅ 导航和交互功能正常

---

**最后更新**: 2024年当前时间  
**状态**: 已修复GitHub Pages部署问题
