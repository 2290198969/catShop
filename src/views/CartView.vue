<template>
  <div class="cart-container">
    <div class="top-nav">
      <router-link to="/" class="logo-button">
        Mao(=•w•=)m
      </router-link>
      <input type="text" placeholder="搜索商品..." class="search-input">
      <button class="search-button">搜索</button>
    </div>
    <!-- 购物车主体 -->
    <div class="cart-body">
      <!-- 全选框及标题 -->
      <div class="cart-header">
        <span>选择</span>
        <span>图片</span>
        <span>商品名称</span>
        <span>单价</span>
        <span>数量</span>
        <span>操作</span>
      </div>
      <!-- 商品列表 -->
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="cart-item-column checkbox-column">
          <input type="checkbox" v-model="item.checked" @change="handleItemCheck">
        </div>
        <div class="cart-item-column image-column">
          <img :src="item.image" alt="商品图片" class="item-image">
        </div>
        <div class="cart-item-column name-column">
          <span class="item-name">{{ item.name }}</span>
        </div>
        <div class="cart-item-column price-column">
          <span class="item-price">¥{{ item.price }}</span>
        </div>
        <div class="cart-item-column ">
          <button @click="decreaseQuantity(index)">-</button>
          <span class="quantity-value">{{ item.quantity }}</span>
          <button @click="increaseQuantity(index)">+</button>
        </div>
        <div class="cart-item-column delete-button-column">
          <button @click="removeItem(index)">删除</button>
        </div>
      </div>
      <!-- 底部结算栏 -->
      <div class="cart-footer">
        <input type="checkbox" v-model="isAllChecked" @change="handleAllCheck">全选
        <span>已选商品总价：¥{{ totalPrice }}</span>
        <button class="checkout-button">结算</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Product1Image from '@/assets/products/product1.jpg'
import Product3Image from '@/assets/products/product3.jpg'
// 模拟购物车商品数据
const cartItems = ref([
  {
    id: 1,
    name: '渴望六种鱼全猫粮5.4kg',
    image: Product1Image,
    price: 649.00,
    quantity: 1,
    checked: false
  },
  {
    id: 2,
    name: '皇家幼猫粮K36 2kg',
    image: Product3Image,
    price: 189.00,
    quantity: 1,
    checked: false
  }
]);

// 全选状态
const isAllChecked = ref(false);

// 计算已选商品总价
const totalPrice = computed(() => {
  return cartItems.value.filter(item => item.checked).reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// 增加商品数量
const increaseQuantity = (index: number) => {
  cartItems.value[index].quantity++;
};

// 减少商品数量
const decreaseQuantity = (index: number) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  }
};

// 处理商品勾选
const handleItemCheck = () => {
  const allChecked = cartItems.value.every(item => item.checked);
  isAllChecked.value = allChecked;
};

// 处理全选
const handleAllCheck = () => {
  cartItems.value.forEach(item => {
    item.checked = isAllChecked.value;
  });
};

// 删除商品
const removeItem = (index: number) => {
  cartItems.value.splice(index, 1);
};
</script>

<style scoped>
.cart-container {
  padding: 12px;
  background: #f8f8f8;
  min-height: 100vh;
}

.cart-header {
  display: grid;
  grid-template-columns: 60px 100px 2fr 1fr 1fr 80px;
  /* 固定列宽 */
  padding: 12px 0;
  font-weight: 500;
}

.cart-item {
  display: grid;
  grid-template-columns: 60px 100px 2fr 1fr 1fr 80px;
  /* 与header保持一致 */
  align-items: center;
  padding: 12px 0;
}

.top-nav {
  display: flex;
  align-items: center;
  background: linear-gradient(.25turn, #712fff 0%, #b133ff 100%);
  color: white;
  padding: 10px;
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

.cart-body {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 12px;
}

.cart-header,
.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.cart-header span,
.cart-footer span {
  margin: 0 12px;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px 0;
}

.cart-item-column {
  flex: 1;
  box-sizing: border-box;
  padding: 0 8px;
  text-align: center;
}

.checkbox-column {
  text-align: left;
  display: flex table-row-group;
}

.image-column {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #eee;
}

.name-column {
  text-align: center;
  display: table-row-group;
}

.price-column {
  text-align: center;
  justify-content: center;
  font-weight: 600;
  color: #712fff;
}

.quantity-control {
  display: table-row-group;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.quantity-control-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-control button,
.delete-button-column button,
.checkout-button {
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.quantity-control button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #9822ff, #b133ff);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-control button:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(152, 34, 255, 0.3);
}

.quantity-display {
  margin: 0 8px;
  /* 给数量显示添加间距 */
}

.delete-button-column button {
  background: linear-gradient(135deg, #9822ff, #f4beff);
  color: white;
  border: none;
  /* 去掉边框 */
  padding: 8px 16px;
  border-radius: 20px;
}

.delete-button-column button:hover {
  background: #9822ff;
}

.checkout-button {
  background: linear-gradient(135deg, #9822ff, #f4beff);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  padding: 12px 40px !important;
  border-radius: 30px !important;
}

.checkout-button:hover {
  opacity: 0.9;
}

.quantity-value {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
}

/* 图片列调整 */
.image-column {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid #eee;
}

/* 价格列样式 */
.price-column {
  font-weight: 600;
  color: #712fff;
}

.delete-button-column {
  text-align: right;
}
</style>