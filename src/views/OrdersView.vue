<template>
  <div class="order-page">
    <!-- 筛选条件 -->
    <div class="filter-container">
      <div class="filter-card">
        <label for="status-filter" class="filter-label">订单状态</label>
        <select id="status-filter" v-model="selectedStatus" @change="filterOrders" class="status-select">
          <option value="all">全部状态</option>
          <option value="pending">待付款</option>
          <option value="paid">已付款</option>
          <option value="shipped">已发货</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="currentOrders.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="10" cy="7" r="4"></circle>
          <path d="M15.5 21H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"></path>
          <path d="M21 15l-3 3-3-3"></path>
        </svg>
        <p class="empty-text">暂无订单记录</p>
      </div>

      <div v-for="order in currentOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-meta">
            <span class="order-id">订单号: {{ order.id }}</span>
            <span class="order-date">2023-06-15</span>
          </div>
          <span class="order-status" :class="'status-' + order.status">
            {{ getStatusText(order.status) }}
          </span>
        </div>

        <div class="order-body">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="item.image" alt="商品图片" class="item-image" />
            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <div class="item-specs">
                <span class="item-price">¥{{ item.price }}</span>
                <span class="item-quantity">×{{ item.quantity }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total">
            合计: <span class="total-amount">¥{{ order.total }}</span>
          </div>
          <div class="order-actions">
            <button v-if="order.status === 'pending'" class="btn primary">立即支付</button>
            <button v-if="order.status === 'shipped'" class="btn outline">确认收货</button>
            <button class="btn secondary">订单详情</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-container" v-if="totalPages > 1">
      <button class="pagination-btn" :disabled="currentPage === 1" @click="prevPage">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        上一页
      </button>

      <div class="page-info">
        第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
      </div>

      <button class="pagination-btn" :disabled="currentPage === totalPages" @click="nextPage">
        下一页
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 模拟订单数据
const orders = ref([
  {
    id: 1,
    status: 'pending',
    items: [
      { id: 101, name: '猫咪主粮 三文鱼配方 1.5kg', price: 50, quantity: 2, image: 'https://picsum.photos/200/200?random=1' },
      { id: 102, name: '膨润土猫砂 10L', price: 30, quantity: 1, image: 'https://picsum.photos/200/200?random=2' }
    ],
    total: 130
  },
  {
    id: 2,
    status: 'paid',
    items: [
      { id: 201, name: '猫咪逗猫棒 羽毛款', price: 20, quantity: 3, image: 'https://picsum.photos/200/200?random=3' },
      { id: 202, name: '猫抓板 圆形', price: 35, quantity: 1, image: 'https://picsum.photos/200/200?random=4' }
    ],
    total: 95
  },
  {
    id: 3,
    status: 'shipped',
    items: [
      { id: 301, name: '猫咪自动饮水机', price: 120, quantity: 1, image: 'https://picsum.photos/200/200?random=5' }
    ],
    total: 120
  },
  {
    id: 4,
    status: 'completed',
    items: [
      { id: 401, name: '猫咪零食 小鱼干 50g', price: 15, quantity: 5, image: 'https://picsum.photos/200/200?random=6' }
    ],
    total: 75
  },
  {
    id: 5,
    status: 'cancelled',
    items: [
      { id: 501, name: '猫咪外出包 太空舱款', price: 80, quantity: 1, image: 'https://picsum.photos/200/200?random=7' }
    ],
    total: 80
  }
]);

// 筛选状态
const selectedStatus = ref('all');

// 当前页码
const currentPage = ref(1);
// 每页显示的订单数量
const itemsPerPage = 2;

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage);
});

// 筛选订单
const filteredOrders = computed(() => {
  if (selectedStatus.value === 'all') {
    return orders.value;
  }
  return orders.value.filter(order => order.status === selectedStatus.value);
});

// 获取当前页的订单
const currentOrders = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredOrders.value.slice(startIndex, endIndex);
});

// 筛选订单的方法
const filterOrders = () => {
  currentPage.value = 1;
};

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return '待付款';
    case 'paid':
      return '已付款';
    case 'shipped':
      return '已发货';
    case 'completed':
      return '已完成';
    case 'cancelled':
      return '已取消';
    default:
      return '未知状态';
  }
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.order-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
}

.filter-container {
  margin-bottom: 24px;
}

.filter-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.filter-label {
  font-size: 14px;
  color: #666;
  margin-right: 12px;
  font-weight: 500;
}

.status-select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: all 0.2s;
  cursor: pointer;
}

.status-select:focus {
  outline: none;
  border-color: #8A2BE2;
  box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-text {
  margin-top: 16px;
  color: #999;
  font-size: 14px;
}

.order-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.order-meta {
  display: flex;
  flex-direction: column;
}

.order-id {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.order-date {
  font-size: 12px;
  color: #999;
}

.order-status {
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-pending {
  color: #FF9500;
  background-color: rgba(255, 149, 0, 0.1);
}

.status-paid {
  color: #007AFF;
  background-color: rgba(0, 122, 255, 0.1);
}

.status-shipped {
  color: #5856D6;
  background-color: rgba(88, 86, 214, 0.1);
}

.status-completed {
  color: #34C759;
  background-color: rgba(52, 199, 89, 0.1);
}

.status-cancelled {
  color: #FF3B30;
  background-color: rgba(255, 59, 48, 0.1);
}

.order-body {
  padding: 16px 24px;
}

.order-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-name {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-specs {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-price {
  font-size: 15px;
  color: #FF3B30;
  font-weight: 600;
}

.item-quantity {
  font-size: 13px;
  color: #999;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.order-total {
  font-size: 15px;
  color: #333;
}

.total-amount {
  font-size: 18px;
  font-weight: 600;
  color: #FF3B30;
}

.order-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn.primary {
  background-color: #8A2BE2;
  color: white;
}

.btn.primary:hover {
  background-color: #7B1FA2;
}

.btn.secondary {
  background-color: white;
  color: #666;
  border-color: #e0e0e0;
}

.btn.secondary:hover {
  background-color: #f5f5f5;
}

.btn.outline {
  background-color: transparent;
  color: #8A2BE2;
  border-color: #8A2BE2;
}

.btn.outline:hover {
  background-color: rgba(138, 43, 226, 0.05);
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  gap: 16px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  border-color: #8A2BE2;
  color: #8A2BE2;
}

.pagination-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .order-footer {
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .order-total {
    align-self: flex-start;
  }

  .order-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .pagination-container {
    flex-direction: column;
    gap: 8px;
  }
}
</style>