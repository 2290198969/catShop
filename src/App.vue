<script setup lang="ts">
import { RouterView } from 'vue-router'
import diLan from '@/components/diLan.vue'
import ShiJian from './components/shiJian.vue';

// 添加全局背景颜色控制
const appBackground = 'rgb(245, 245, 245) '; // 灰色背景值
</script>

<template>
  <div class="fullscreen-bg" :style="{ backgroundColor: appBackground }"></div>
  <RouterView />
  <diLan />
  <ShiJian />
</template>

<style scoped>
/* 全屏背景样式 */
.fullscreen-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}
</style>
