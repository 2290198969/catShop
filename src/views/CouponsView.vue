<template>
  <div class="coupons-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">我的优惠券</h1>
      <div class="coupons-count" v-if="filteredCoupons.length > 0">
        共 <span class="count-number">{{ filteredCoupons.length }}</span> 张优惠券
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="filter-container">
      <div class="filter-tabs">
        <button v-for="tab in tabs" :key="tab.value" :class="['tab-button', { 'active': selectedFilter === tab.value }]"
          @click="changeTab(tab.value)">
          {{ tab.label }}
          <span v-if="tab.count > 0" class="tab-count">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div v-if="filteredCoupons.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
          </path>
        </svg>
      </div>
      <p class="empty-text">{{ emptyText }}</p>
      <button class="get-coupons-btn" @click="goToCouponCenter">领取更多优惠券</button>
    </div>

    <div v-else class="coupons-list">
      <div v-for="coupon in filteredCoupons" :key="coupon.id" :class="['coupon-card', { 'expired': coupon.isExpired }]">
        <div class="coupon-left">
          <div class="coupon-value">
            <span class="currency">¥</span>
            <span class="amount">{{ coupon.value }}</span>
          </div>
          <div class="coupon-type" v-if="coupon.type">{{ coupon.type }}</div>
        </div>

        <div class="coupon-right">
          <div class="coupon-info">
            <h3 class="coupon-name">{{ coupon.name }}</h3>
            <p class="coupon-condition">满{{ coupon.condition }}元可用</p>
            <p class="coupon-expiry">有效期至 {{ coupon.expiry }}</p>
          </div>

          <div class="coupon-status">
            <span v-if="coupon.isExpired" class="status-tag expired">已过期</span>
            <span v-else class="status-tag usable">可使用</span>
            <button v-if="!coupon.isExpired" class="use-btn">立即使用</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 模拟优惠券数据
const coupons = ref([
  {
    id: 1,
    name: '全品类通用券',
    value: 30,
    condition: 100,
    expiry: '2025-06-30',
    isExpired: false,
    type: '满减券'
  },
  {
    id: 2,
    name: '宠物食品专用券',
    value: 50,
    condition: 200,
    expiry: '2025-05-15',
    isExpired: true,
    type: '品类券'
  },
  {
    id: 3,
    name: '新用户专享礼',
    value: 20,
    condition: 50,
    expiry: '2025-07-31',
    isExpired: false,
    type: '新人券'
  },
  {
    id: 4,
    name: '会员专享优惠券',
    value: 100,
    condition: 500,
    expiry: '2025-08-15',
    isExpired: false,
    type: '会员券'
  }
]);

// 筛选条件
const selectedFilter = ref('all');

// 选项卡配置
const tabs = computed(() => [
  {
    label: '全部',
    value: 'all',
    count: coupons.value.length
  },
  {
    label: '可使用',
    value: 'usable',
    count: coupons.value.filter(c => !c.isExpired).length
  },
  {
    label: '已过期',
    value: 'expired',
    count: coupons.value.filter(c => c.isExpired).length
  }
]);

// 空状态文本
const emptyText = computed(() => {
  switch (selectedFilter.value) {
    case 'usable':
      return '暂无可用优惠券';
    case 'expired':
      return '暂无已过期优惠券';
    default:
      return '您还没有优惠券';
  }
});

// 计算筛选后的优惠券列表
const filteredCoupons = computed(() => {
  if (selectedFilter.value === 'all') {
    return coupons.value;
  }
  if (selectedFilter.value === 'usable') {
    return coupons.value.filter(coupon => !coupon.isExpired);
  }
  return coupons.value.filter(coupon => coupon.isExpired);
});

// 切换选项卡
const changeTab = (tabValue: string) => {
  selectedFilter.value = tabValue;
};

// 去领券中心
const goToCouponCenter = () => {
  router.push('/coupon-center');
};
</script>

<style scoped>
.coupons-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333;
  min-height: 100vh;
  background-color: #f8f9fa;
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

.coupons-count {
  font-size: 14px;
  color: #666;
}

.count-number {
  color: #8A2BE2;
  font-weight: 600;
}

.filter-container {
  margin-bottom: 24px;
}

.filter-tabs {
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tab-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.tab-button.active {
  color: #8A2BE2;
  background: #f5f0ff;
  border-radius: 8px;
  font-weight: 600;
}

.tab-count {
  margin-left: 4px;
  font-size: 12px;
  background: #8A2BE2;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  min-width: 18px;
  text-align: center;
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

.get-coupons-btn {
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

.get-coupons-btn:hover {
  background-color: #7B1FA2;
}

.coupons-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.coupon-card {
  display: flex;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.coupon-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.coupon-card.expired {
  opacity: 0.7;
}

.coupon-left {
  width: 120px;
  background: linear-gradient(135deg, #8A2BE2, #A45EE5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: white;
  position: relative;
  overflow: hidden;
}

.coupon-card.expired .coupon-left {
  background: linear-gradient(135deg, #999, #bbb);
}

.coupon-left::after {
  content: "";
  position: absolute;
  right: -8px;
  top: 0;
  bottom: 0;
  width: 16px;
  background: radial-gradient(circle at 0 50%, transparent 0, transparent 8px, #f8f9fa 8px);
  z-index: 1;
}

.coupon-value {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}

.currency {
  font-size: 16px;
  margin-right: 2px;
  margin-top: 4px;
}

.amount {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.coupon-type {
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
}

.coupon-right {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.coupon-info {
  margin-bottom: 12px;
}

.coupon-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.coupon-condition {
  font-size: 13px;
  color: #666;
  margin: 0 0 4px 0;
}

.coupon-expiry {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.coupon-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-tag.usable {
  background: rgba(52, 199, 89, 0.1);
  color: #34C759;
}

.status-tag.expired {
  background: rgba(255, 59, 48, 0.1);
  color: #FF3B30;
}

.use-btn {
  padding: 6px 12px;
  background-color: #8A2BE2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.use-btn:hover {
  background-color: #7B1FA2;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .coupon-left {
    width: 100px;
  }

  .amount {
    font-size: 28px;
  }
}
</style>