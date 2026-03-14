<template>
  <!-- 可伸缩时间面板 -->
  <div class="corner-panel" @mouseenter="isExpanded = true" @mouseleave="isExpanded = false">
    <div class="time-content" :class="{ expanded: isExpanded }">
      <div class="time">{{ formattedTime }}</div>
      <div class="date">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { formatTime, formatDate } from '@/utils/date';
export default defineComponent({
  setup() {

    // 时间日期格式化
    const now = ref(new Date());
    setInterval(() => {
      now.value = new Date();
    }, 1000);

    const formattedTime = computed(() => formatTime(now.value));
    const formattedDate = computed(() => formatDate(now.value));

    // 面板展开状态
    const isExpanded = ref(false);

    return {
      formattedTime,
      formattedDate,
      isExpanded // 暴露给模板
    };
  }
});
</script>

<style scoped>
/* 可伸缩时间面板信息 */
.corner-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(calc(100% - 30px));
  z-index: 100;
  transition: all 0.3s cubic - bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 15px 0 0 15px;
  padding: 12px 16px;
  height: 80px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-left: 3px solid #7B68EE;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.time-content {
  position: relative;
  background: rgba(255, 255, 255, 0.92);
  padding: 1.5rem 3rem 1.5rem 2rem;
  transform: translateX(100%);
  transition: all 0.4s 0.1s ease-out;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  padding: 2rem;
}

/* 悬停时滑动出现 */
.corner-panel:hover {
  filter: drop-shadow(2px 0 8px rgba(123, 104, 238, 0.2));
  transform: translateY(-50%) scale(1.02);

  .time-content {
    transform: translateX(0);
    border-radius: 0%;
  }
}

.time {
  font-family: 'Courier New', monospace;
  color: #4b0082;
  font-weight: 600;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  text-align: center;
}

.date {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #9370db;
  margin-top: 0.5rem;
  font-family: 'Arial Rounded MT Bold', sans - serif;
  grid-column: 1 / -1;
  text-align: center;
}

@media (max-width: 1024px) {
  .time {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
  }

  .time-panel.expanded {
    width: 160px;
  }
}

@media (max-width: 768px) {
  .time-content {
    padding: 0.8rem;
    gap: 4px;
  }

  .time {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
  }

  .date {
    font-size: clamp(0.8rem, 1.8vw, 1rem);
  }
}


@media (max-width: 480px) {
  .time-panel.expanded {
    width: 140px;
  }

  .time {
    font-size: clamp(0.8rem, 1.5vw, 1rem);
  }

  .date {
    font-size: clamp(0.7rem, 1.2vw, 0.9rem);
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