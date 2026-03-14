<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <h1 @click="changePage(-1)">
      <router-link to="/" title="MaoMall商城官网">Mao(=•w•=)m</router-link>
    </h1>
    <!-- 搜索栏 -->
    <div class="search-box">
      <input type="text" placeholder="搜索商品..." class="search-input">
      <button class="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search"
          viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </button>
    </div>
    <!-- 导航项 -->
    <div class="nav">
      <router-link v-for="(item, index) in navItems" :key="index" :to="item.path"
        :class="{ active: activeIndex === index }">
        {{ item.text }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();

    // 导航项数据
    const navItems = ref([
      { text: '购物车', path: '/cart' },
      { text: '我的', path: '/user' }
    ]);

    // 活动状态索引
    const activeIndex = computed(() => {
      return navItems.value.findIndex(item => item.path === router.currentRoute.value.path);
    });

    // 页面切换方法
    const changePage = (direction: -1 | 1) => {
      const currentRoute = router.currentRoute.value;
      const currentPage = parseInt(currentRoute.query.page as string || '1', 10);
      if (isNaN(currentPage)) {
        console.error('Invalid page number in query');
        return;
      }
      const newPage = direction === -1 ? Math.max(1, currentPage - 1) : currentPage + 1;
      router.push({
        path: '/',
        query: {
          page: newPage.toString()
        }
      });
    };

    return {
      navItems,
      activeIndex,
      changePage,
    };
  }
});
</script>

<style scoped>
.app-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0.5rem 0;
  background: linear-gradient(.25turn, #712fff 0%, #b133ff 100%);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  min-height: 40px;
  height: auto;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  text-align: center;
  margin: 0.5rem 0 1rem;
  cursor: pointer;
  padding-left: 2rem;
  position: relative;
}

h1 a {
  text-decoration: none;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-family: 'Arial Black', sans-serif;
  font-weight: 400;
  letter-spacing: -2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  transform-origin: left center;
  color: rgba(137, 43, 226, 0.621);
  background: linear-gradient(180deg, #712fff 0%, #b133ff 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(144, 94, 244, 0.2);
}

h1 a:hover {
  color: #fffcff;
  text-shadow: 3px 3px 6px rgba(147, 112, 219, 0.3);
  transform: scale(1.30) rotate(-3deg);
}

/* 头部容器布局 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin: 1rem 0;
}

/* 搜索栏样式 */
.search-box {
  display: flex;
  align-items: center;
  background: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  width: 50%;
  min-width: 280px;
  margin: 0 2rem;
  transition: all 0.3s ease;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  min-width: 120px;
  padding: 0.8rem 1rem;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  /* 动态字体 */
  color: #2c3e50;
  outline: none;
}

.search-button {
  background: #b53dff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-icon {
  width: 20px;
  height: 20px;
  fill: rgb(255, 255, 255);
}

.search-button:hover {
  background: rgb(144, 94, 244);
  transform: rotate(15deg) scale(1.1);
}

/* 导航栏响应式 */
.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;
}

/* 添加这部分样式确保去掉下划线 */
.nav router-link,
.nav router-link:hover,
.nav router-link:active,
.nav router-link:visited {
  text-decoration: none;
}

.nav a {
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  color: #34495e;
  font-size: clamp(14px, 2vw, 18px);
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;
}

.nav a.active {
  background: linear-gradient(180deg, #2323ffb9, #c649ff);
  color: white;
  box-shadow: inset 0 -4px 12px rgba(0, 0, 0, 0.1);
}

.nav a:hover:not(.active) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 94, 244, 0.2);
  color: #9370DB;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .nav {
    gap: 1rem;
    justify-content: space-around;
  }

  .nav a {
    padding: 0.6rem 1.2rem;
  }

  .corner-panel {
    right: -30px;
    bottom: 20px;
  }

  .time-content {
    padding: 10px 20px 10px 30px;
    font-size: 0.9rem;

    &::before {
      left: -15px;
      border-width: 8px;
    }
  }

  .time {
    font-size: 1rem;
  }

  .date {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .search-box {
    border-radius: 25px;
    padding: 0.3rem;
  }

  .search-input {
    padding: 0.5rem 0.7rem;
    font-size: 0.9rem;
  }

  .search-button {
    width: 35px;
    height: 35px;
    margin-right: 0.3rem;
    /* 右侧触控留白 */
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .search-box {
    width: 100%;
    margin: 0;
    min-width: auto;
    max-width: none;
  }

  h1 a {
    font-size: clamp(2rem, 6vw, 2.5rem);
  }

  .nav a:hover {
    transform: translateY(0);
    /* 移除悬停位移 */
  }
}

@media (max-width: 480px) {
  .search-box {
    padding: 0.3rem;
  }

  .search-input {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .search-button {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 1024px) {
  .search-box {
    width: 65%;
    margin: 0 1.5rem;
  }
}

/*暗黑模式适配*/
@media (prefers-color-scheme: dark) {
  .nav a:hover:not(.active) {
    color: #FFFFFFCC;
    /* 浅紫色文字 */
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>