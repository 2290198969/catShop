<template>
  <div class="favorite-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">我的收藏</h1>
      <div class="favorite-count" v-if="favorites.length > 0">
        <span class="count-number">{{ favorites.length }}</span>件收藏商品
      </div>
    </div>

    <!-- 收藏列表 -->
    <div v-if="favorites.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
          </path>
        </svg>
      </div>
      <p class="empty-text">您还没有收藏任何商品</p>
      <button class="browse-btn" @click="goToShopping">去逛逛</button>
    </div>

    <div v-else class="favorite-list">
      <div v-for="product in favorites" :key="product.id" class="favorite-card">
        <div class="product-image-container">
          <img :src="product.image" alt="商品图片" class="product-image" />
          <div class="product-tag" v-if="product.tag">{{ product.tag }}</div>
        </div>

        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-meta">
            <span class="product-type">{{ product.type }}</span>
            <div class="rating">
              <span class="stars">★★★★★</span>
              <span class="rating-count">{{ product.reviews }}条评价</span>
            </div>
          </div>

          <div class="price-section">
            <div class="current-price">¥{{ product.price }}</div>
            <div v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</div>
          </div>

          <div class="product-actions">
            <button class="add-to-cart" @click.stop="addToCart(product)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              加入购物车
            </button>
            <button class="remove-favorite" @click.stop="removeFromFavorites(product.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 模拟收藏商品数据
const favorites = ref([
  {
    id: 1,
    name: '猫咪全价主粮 三文鱼配方 1.5kg',
    price: 50,
    originalPrice: 68,
    type: '猫粮',
    tag: '热销',
    image: 'https://picsum.photos/300/300?random=1',
    reviews: 128
  },
  {
    id: 2,
    name: '膨润土猫砂 10L 超强结团 低粉尘',
    price: 30,
    type: '猫砂',
    tag: '新品',
    image: 'https://picsum.photos/300/300?random=2',
    reviews: 56
  },
  {
    id: 3,
    name: '猫咪自动饮水机 静音循环 2L大容量',
    price: 129,
    originalPrice: 159,
    type: '宠物用品',
    image: 'https://picsum.photos/300/300?random=3',
    reviews: 342
  },
  {
    id: 4,
    name: '猫咪零食 小鱼干 50g 高蛋白',
    price: 15,
    type: '零食',
    tag: '限时特惠',
    image: 'https://picsum.photos/300/300?random=4',
    reviews: 89
  }
]);

// 移除收藏商品的方法
const removeFromFavorites = (id: number) => {
  favorites.value = favorites.value.filter(item => item.id !== id);
};

// 加入购物车
const addToCart = (product: any) => {
  console.log('加入购物车:', product);
  // 这里可以添加实际的购物车逻辑
};

// 去逛逛
const goToShopping = () => {
  router.push('/products');
};
</script>

<style scoped>
.favorite-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.favorite-count {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
}

.count-number {
  font-size: 18px;
  font-weight: 600;
  color: #8A2BE2;
  margin-right: 4px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 24px;
}

.browse-btn {
  padding: 10px 24px;
  background-color: #8A2BE2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.browse-btn:hover {
  background-color: #7B1FA2;
}

.favorite-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.favorite-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* 1:1 比例 */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.favorite-card:hover .product-image {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #FF3B30;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.product-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.product-type {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.rating {
  display: flex;
  align-items: center;
}

.stars {
  color: #FF9500;
  font-size: 12px;
  margin-right: 4px;
}

.rating-count {
  font-size: 12px;
  color: #999;
}

.price-section {
  margin-bottom: 16px;
}

.current-price {
  font-size: 18px;
  font-weight: 600;
  color: #FF3B30;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.add-to-cart {
  flex: 1;
  padding: 8px 12px;
  background-color: #8A2BE2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.add-to-cart:hover {
  background-color: #7B1FA2;
}

.remove-favorite {
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background-color: #f5f5f5;
  color: #FF3B30;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-favorite:hover {
  background-color: #FFEBEE;
}

@media (max-width: 768px) {
  .favorite-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .favorite-list {
    grid-template-columns: 1fr;
  }
}
</style>