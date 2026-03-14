<template>
  <div class="category-page">
    <div class="header">
      <div class="top-nav">
        <router-link to="/" class="logo-button">
          Mao(=•w•=)m
        </router-link>
        <input v-model="searchQuery" type="text" placeholder="搜索商品" class="search-input" />
        <button class="search-button">搜索</button>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="main-container">
      <!-- 左侧分类导航 -->
      <div class="left-nav">
        <div v-for="(category, key) in categoryMap" :key="key" class="nav-item"
          :class="{ active: activeCategory === key }" @click="selectCategory(key)">
          {{ getCategoryName(key) }}
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right-content">
        <!-- 商品展示 -->
        <div v-if="filteredProducts.length > 0" class="product-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <img :src="getImageUrl(product.image)" class="product-img" :alt="product.name" />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
              <span class="product-type">{{ product.type }}</span>
            </div>
          </div>
        </div>
        <div v-else class="empty-tip">
          🙀未找到相关商品哦~😿
        </div>
      </div>
    </div>
    <!-- 引入底部版权信息组件，此处假设为空组件，实际请按需引入 -->
    <FooterCopyright />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// 导入 products.json 文件
import categoryData from '@/assets/products/products.json';
// 导入底部版权信息组件
import FooterCopyright from '@/components/footerCopyright.vue';

// 定义商品数据类型
interface Product {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
}

// 定义分类数据类型
type CategoryData = Record<string, Product[]>;

// 确保 categoryData 类型正确
const typedCategoryData = categoryData as CategoryData;

// 分类映射表
const categoryMap: Record<string, string> = {
  cat_food: '主粮',
  litter: '猫砂',
  toy: '玩具',
  scratchingPost: '猫抓板',
  hairballCream: '化毛护理',
  earWash: '耳部清洁',
  nest: '猫窝',
  bowl: '猫食盆',
  litterBox: '猫砂盆',
  anthelmintics: '驱虫保健',
  shampoo: '洗护用品',
  comb: '梳子',
  nailClipper: '指甲剪',
  toothpaste: '猫牙膏',
  toothbrush: '猫牙刷',
  eyeDrop: '眼药水',
  vaccine: '疫苗',
  snack: '零食',
  cannedFood: '主食罐',
  catnip: '猫薄荷',
  catHouse: '猫别墅'
};

// 响应式数据
const activeCategory = ref('cat_food');
const searchQuery = ref('');

// 获取当前分类商品
const currentProducts = computed(() => {
  return typedCategoryData[activeCategory.value] || [];
});

// 过滤商品
const filteredProducts = computed(() => {
  if (searchQuery.value === '') {
    return currentProducts.value;
  }
  return currentProducts.value.filter((product: Product) =>
    product.name.includes(searchQuery.value)
  );
});

// 分类名称映射
const getCategoryName = (key: string) => {
  return categoryMap[key] || '未知分类';
};

// 图片路径处理
const getImageUrl = (filename: string) => {
  const url = new URL(`/src/assets/products/${filename}`, import.meta.url).href;
  console.log(`Image URL for ${filename}:`, url); // 添加调试信息
  return url;
};

// 分类选择
const selectCategory = (key: string) => {
  activeCategory.value = key;
  searchQuery.value = '';
};
</script>

<style scoped>
.category-page {
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  min-height: 100vh;
}

.header {
  margin-bottom: 12px;
}

.top-nav {
  display: flex;
  align-items: center;
  background: linear-gradient(.25turn, #712fff 0%, #b133ff 100%);
  color: white;
  padding: 10px;
  height: 60px;
}

.logo-button {
  text-decoration: none;
  color: white;
  font-size: 24px;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.logo-button:hover {
  color: #fffcff;
  text-shadow: 3px 3px 6px rgba(147, 112, 219, 0.3);
  transform: scale(1.1) rotate(-3deg);
}

.search-input {
  flex: 1;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  margin: 0 12px;
}

.search-button {
  background: white;
  color: #712fff;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.main-container {
  flex: 1;
  display: flex;
  margin-top: 1px;
  /* 防止margin合并 */
}

.left-nav {
  width: 140px;
  background: white;
  padding: 1rem 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.nav-item {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
  border-left: 3px solid transparent;
}

.nav-item.active {
  border-left-color: #8A2BE2;
  color: #8A2BE2;
  font-weight: 600;
  background: rgba(138, 43, 226, 0.05);
}

.nav-item:hover {
  background: rgba(138, 43, 226, 0.03);
}

.right-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.product-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-3px);
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.product-info {
  padding: 1rem;
}

.product-name {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  color: #ff4444;
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.product-type {
  display: block;
  color: #666;
  font-size: 0.9rem;
}

.empty-tip {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  background: white;
  padding: 1rem;
  border-top: 1px solid #eee;
  flex-shrink: 0;
}

.bottom-nav router-link {
  text-decoration: none;
  color: #666;
  transition: color 0.2s ease;
}

.bottom-nav router-link:hover {
  color: #8A2BE2;
}
</style>