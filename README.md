# 🐱 CatShop - 猫咪宠物用品商城

![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0.2-F7D336?style=flat-square&logo=pinia&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**一款现代化、响应式的猫咪宠物用品电商平台**

---

## 📖 项目简介

CatShop 是一款专为猫咪爱好者打造的宠物用品电商平台，采用现代化的前端技术栈构建，提供流畅的购物体验。项目基于 **Vue 3** + **TypeScript** + **Vite** 开发，结合 **TailwindCSS** 实现精美的响应式 UI 设计。

---

## ✨ 功能特性

### 🛒 核心购物功能

- **商品浏览** - 多品类商品展示，支持分类筛选
- **购物车管理** - 商品添加、删除、数量调整
- **订单管理** - 订单创建、查看、状态追踪
- **优惠券系统** - 优惠券领取与使用

### 👤 用户中心

- **个人中心** - 用户信息管理
- **收藏夹** - 喜爱商品收藏功能
- **设置中心** - 个性化配置

### 📦 商品分类

| 分类        | 描述                       |
| :---------- | :------------------------- |
| 🍖 猫粮     | 干粮、湿粮、冻干等         |
| 🧹 猫砂     | 膨润土、豆腐砂、混合砂     |
| 🧸 玩具     | 逗猫棒、电动玩具、益智玩具 |
| 🪵 猫抓板   | 各类猫抓板、猫爬架         |
| 💊 保健品   | 化毛膏、营养膏等           |
| 🧴 护理用品 | 洗耳液、沐浴露等           |

---

## 🛠 技术栈

### 前端框架

- **Vue 3.5** - 渐进式 JavaScript 框架，采用 Composition API
- **TypeScript 5.8** - 类型安全的 JavaScript 超集
- **Vite 6.2** - 下一代前端构建工具

### 状态管理与路由

- **Pinia 3.0** - Vue 官方推荐的状态管理库
- **Vue Router 4.5** - Vue.js 官方路由管理器

### UI 与样式

- **TailwindCSS 4.0** - 实用优先的 CSS 框架

### 代码规范

- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化工具
- **EditorConfig** - 编辑器配置统一

---

## 📁 项目结构

```
catshop/
├── public/                 # 静态资源
│   └── favicon.ico
├── src/
│   ├── assets/            # 资源文件
│   │   └── products/      # 商品图片与数据
│   ├── components/        # 公共组件
│   │   ├── diLan.vue      # 底部导航栏
│   │   ├── dingLan.vue    # 顶部导航栏
│   │   ├── footerCopyright.vue
│   │   ├── productGrid.vue
│   │   └── shiJian.vue
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── utils/             # 工具函数
│   ├── views/             # 页面视图
│   │   ├── HomeView.vue       # 首页
│   │   ├── CategoryView.vue   # 分类页
│   │   ├── CartView.vue       # 购物车
│   │   ├── UserView.vue       # 用户中心
│   │   ├── CouponsView.vue    # 优惠券
│   │   ├── OrdersView.vue     # 订单列表
│   │   ├── FavoritesView.vue  # 收藏夹
│   │   └── SettingView.vue    # 设置页
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **Bun** >= 1.0.0 (推荐) 或 **npm** / **yarn** / **pnpm**

### 安装依赖

```bash
bun install
```

### 开发模式

```bash
bun dev
```

应用将在 `http://localhost:5173` 启动

### 生产构建

```bash
# 类型检查 + 构建
bun run build

# 仅构建
bun run build-only
```

### 代码检查

```bash
# ESLint 检查并修复
bun lint

# 代码格式化
bun format
```

### 预览构建结果

```bash
bun preview
```

---

## 📋 开发规范

### Git 提交规范

| 类型       | 描述            |
| :--------- | :-------------- |
| `feat`     | 新功能          |
| `fix`      | 修复 Bug        |
| `docs`     | 文档更新        |
| `style`    | 代码格式调整    |
| `refactor` | 代码重构        |
| `perf`     | 性能优化        |
| `test`     | 测试相关        |
| `chore`    | 构建/工具链相关 |

### 代码风格

- 使用 **Composition API** 编写 Vue 组件
- 遵循 **ESLint** + **Prettier** 代码规范
- 组件命名采用 **PascalCase**
- 文件命名采用 **camelCase**

---

## 🔮 路线图

- [ ] 用户登录/注册系统
- [ ] 商品搜索功能
- [ ] 商品详情页
- [ ] 支付系统集成
- [ ] 后台管理系统
- [ ] 移动端适配优化
- [ ] PWA 支持
- [ ] 国际化 (i18n)

---

## 🤝 贡献指南

欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目基于 MIT 许可证开源。

---

> Made with ❤️ for Cat Lovers
