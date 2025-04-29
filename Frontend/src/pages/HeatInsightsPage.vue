<template>
  <div class="relative bg-[#f0f6ff] min-h-screen p-4">
    <!-- 顶部标题 -->
    <header class="chart-header">
      <h1 class="chart-title">Heat Insights</h1>
      <p class="text-sm text-gray-700 max-w-3xl mx-auto mt-2">
        Discover interactive charts and visualizations that reveal real historical insights in heat trends and impacts.<br/>
        Click each section from the left tab to switch pages.
      </p>
    </header>

    <!-- 左侧导航菜单 -->
    <aside-navigation-bar></aside-navigation-bar>
    <el-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </div>
</template>

<script setup>
import AsideNavigationBar from '@/components/AsideNavigationBar.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.common-layout {
  min-height: inherit;
}

.chart-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chart-header {
  background-color: #E5F2FF;
  padding: 30px 40px 20px;
  text-align: left;
}

.chart-title {
  color: #19619E;
  font-family: 'Abril Fatface', serif;
  font-size: 28px;
  margin-bottom: 8px;
}

.chart-subtitle {
  font-size: 14px;
  color: #333;
}

.toggle-button {
  margin: 10px auto;
  display: block;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow: auto;
  padding-left: 50px;
  min-height: 500px;
  background-color: white;
}

.el-main>* {
  max-width: 100%;
  width: 100%;
}
</style>
