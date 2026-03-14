<template>
  <div class="home-container">
    <section class="recommend-section">
      <div class="product-grid">
        <div class="product-card" v-for="(product, index) in products" :key="index">
          <div class="product-thumb">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-badges">
              <span v-if="product.isNew" class="new-badge">新品</span>
              <span class="discount-badge" v-if="product.discount">立减{{ product.discount }}%</span>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-title">{{ product.name }}</h3>
            <div class="price-wrapper">
              <span class="current-price">¥{{ product.price.toFixed(2) }}</span>
              <del class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice.toFixed(2) }}</del>
            </div>
            <div class="sales-tag">已售{{ formatSales(product.sales) }}</div>
            <div class="action-bar">
              <button class="cart-button">
                <i class="icon-cart-add"></i>
              </button>
              <button class="quick-buy">立即购买</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

// 静态资源导入
import Product1Image from '@/assets/products/product1.jpg'
import Product3Image from '@/assets/products/product3.jpg'
import Product4Image from '@/assets/products/product4.jpg'
import Product5Image from '@/assets/products/product5.jpg'
import Product6Image from '@/assets/products/product6.jpg'
import Product7Image from '@/assets/products/product7.jpg'
import Product8Image from '@/assets/products/product8.jpg'
import Product9Image from '@/assets/products/product9.jpg'
import Product10Image from '@/assets/products/product10.jpg'


interface Product {
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  sales: number
  isNew: boolean
}
export default defineComponent({
  setup() {

    // 商品数据
    const products = ref<Product[]>([
      {
        name: '渴望六种鱼全猫粮5.4kg',
        image: Product1Image,
        price: 649.00,
        originalPrice: 699.00,
        discount: 7,
        sales: 23456,
        isNew: false
      },
      // 在products数组中新增以下商品

      // 主粮类
      {
        name: '皇家幼猫粮K36 2kg',
        image: Product3Image,
        price: 189.00,
        originalPrice: 215.00,
        discount: 12,
        sales: 15670,
        isNew: true
      },
      {
        name: '爱肯拿海洋盛宴6kg',
        image: Product4Image,
        price: 689.00,
        originalPrice: 789.00,
        discount: 13,
        sales: 8923,
        isNew: false
      },

      // 猫砂类
      {
        name: '铂钻膨润土猫砂6.35kg',
        image: Product5Image,
        price: 129.00,
        originalPrice: 159.00,
        discount: 19,
        sales: 23451,
        isNew: false
      },
      {
        name: 'Pidan混合砂4.5kg',
        image: Product6Image,
        price: 39.90,
        sales: 45678,
        isNew: true
      },

      // 玩具类
      {
        name: '电动逗猫蝴蝶鱼',
        image: Product7Image,
        price: 79.00,
        originalPrice: 99.00,
        discount: 20,
        sales: 6721,
        isNew: true
      },
      {
        name: '三层转盘猫抓板',
        image: Product8Image,
        price: 129.00,
        sales: 3421,
        isNew: false
      },

      // 保健类
      {
        name: '红狗化毛膏120g',
        image: Product9Image,
        price: 59.00,
        originalPrice: 69.00,
        discount: 14,
        sales: 12345,
        isNew: false
      },
      {
        name: '维克耳漂洗耳液60ml',
        image: Product10Image,
        price: 89.00,
        sales: 8965,
        isNew: true
      }
    ])
    // 其他商品...

    // 格式化销量方法
    const formatSales = (sales: number): string => {
      return sales > 10000
        ? `${(sales / 10000).toFixed(1)}万`
        : sales.toString()
    }

    // 计算属性转换（实际使用的示例）
    const formattedProducts = computed(() =>
      products.value.map(p => ({
        ...p,
        formattedPrice: `¥${p.price.toFixed(2)}`,
        formattedSales: formatSales(p.sales)
      }))
    )
    return {
      products: formattedProducts, // 返回处理后的计算属性
      formatSales
    }
  }
})
</script>

<style scoped>
.home-container {
  padding: 12px;
  background: #f8f8f8;
  min-height: calc(100vh - 120px);
  margin-top: 220px;
}

/* 商品网格 */
.product-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 16px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px);
}

.product-thumb {
  position: relative;
  aspect-ratio: 1/1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
}

.new-badge {
  background: #8640ff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.discount-badge {
  background: #ffd700;
  color: #333;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.product-info {
  padding: 12px;
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 6px;
}

.current-price {
  color: #684dff;
  font-size: 18px;
  font-weight: 700;
}

.original-price {
  color: #999;
  font-size: 12px;
}

.sales-tag {
  color: #666;
  font-size: 12px;
  margin-bottom: 12px;
}

.action-bar {
  display: flex;
  gap: 8px;
  align-items: center;
}

.cart-button {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.cart-button:hover {
  background: #e0e0e0;
}

.quick-buy {
  flex: 1;
  background: linear-gradient(135deg, #9822ff, #f4beff);
  border: none;
  border-radius: 20px;
  color: white;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.quick-buy:hover {
  opacity: 0.85;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .category-card {
    flex-basis: 100px;
    padding: 12px;
  }

  .category-image {
    width: 64px;
    height: 64px;
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .home-container {
    padding: 20px 50px;
  }
}
</style>