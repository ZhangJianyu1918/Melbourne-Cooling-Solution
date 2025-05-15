<template>
  <div class="relative bg-[#f0f6ff] min-h-screen p-8" style="padding-left: 150px; padding-right: 150px;">
    <!-- 顶部标题 -->
    <header class="chart-header">
      <h1 class="chart-title">Heat Insights</h1>
      <p class="text-sm text-gray-700 max-w-3xl mx-auto mt-2">
        Discover interactive charts and visualizations that reveal real historical insights in heat trends and
        impacts.<br />
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
    <div style="text-align: end;">
      <el-button type="text" @click="chartSwitch()" style="font: 1.2em sans-serif; padding-top: 30px;">
        <el-icon class="mr-1"><arrow-right /></el-icon>
        {{ message }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import AsideNavigationBar from '@/components/AsideNavigationBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const message = ref('Go to Next Chart')
const chartSwitch = () => {
  if (router.currentRoute.value.path == '/heat-insights/heatmap') {
    router.push('/heat-insights/heatwave-duration-peak')
  }
  else if (router.currentRoute.value.path == '/heat-insights/heatwave-duration-peak') {
    router.push('/heat-insights/extreme-weather')
  }
  else if (router.currentRoute.value.path == '/heat-insights/extreme-weather') {
    router.push('/heat-insights/heat-deaths-and-hospitalisations')
  }
  else if (router.currentRoute.value.path == '/heat-insights/heat-deaths-and-hospitalisations') {
    router.push('/heat-insights/age-sex')
  }
  else if (router.currentRoute.value.path == '/heat-insights/age-sex') {
    message.value = 'Go to Help & Support Page'
    router.push('/community-support')
  }
}

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
  color: #19619e;
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Abril Fatface';
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
