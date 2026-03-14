<template>
  <div class="user-page">
    <!-- 头部信息区域 -->
    <div class="user-header">
      <img :src="userAvatar" alt="用户头像" class="user-avatar" />
      <div class="user-info">
        <h2 class="user-name">{{ userName }}</h2>
        <p class="user-level">会员等级：{{ userLevel }}</p>
      </div>
    </div>

    <!-- 功能列表区域 -->
    <div class="user-function-list">
      <div class="function-item" @click="goToOrders">
        <span class="function-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt"
            viewBox="0 0 16 16">
            <path
              d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm12 1h-9a1 1 0 0 0-1 1v7.21l1.243 1.746a.5.5 0 0 0 .894 0L8 10.21V4a1 1 0 0 1 1-1h9v9H2V2h9a1 1 0 0 1 1 1v6.21l1.757 2.458a.5.5 0 0 0 .426.242h.014a.5.5 0 0 0 .426-.242L14 9.21V2z" />
          </svg>
        </span>
        <span class="function-text">我的订单</span>
      </div>
      <div class="function-item" @click="goToFavorites">
        <span class="function-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          </svg>
        </span>
        <span class="function-text">我的收藏</span>
      </div>
      <div class="function-item" @click="goToCoupons">
        <span class="function-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-ticket-perforated-fill" viewBox="0 0 16 16">
            <path
              d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm4.5 1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Zm5-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V5Zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V8Zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1Z" />
          </svg>
        </span>
        <span class="function-text">我的优惠券</span>
      </div>
      <div class="function-item" @click="goToSettings">
        <span class="function-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill"
            viewBox="0 0 16 16">
            <path
              d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.85z" />
          </svg>
        </span>
        <span class="function-text">设置</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 模拟用户信息
const userAvatar = ref('https://example.com/default-avatar.jpg'); // 这里可以替换为实际的头像链接
const userName = ref('猫咪爱好者');
const userLevel = ref('普通会员');

const router = useRouter();

// 跳转到我的订单页面
const goToOrders = () => {
  router.push('/orders');
};

// 跳转到我的收藏页面
const goToFavorites = () => {
  router.push('/favorites');
};

// 跳转到我的优惠券页面
const goToCoupons = () => {
  router.push('/coupons');
};

// 跳转到设置页面
const goToSettings = () => {
  router.push('/settings');
};
</script>

<style scoped>
.user-page {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 20px;
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0;
  font-size: 1.2rem;
}

.user-level {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.user-function-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.function-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.function-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.function-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.function-text {
  font-size: 1rem;
  color: #333;
}
</style>