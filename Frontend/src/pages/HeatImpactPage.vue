<template>
  <div class="relative bg-[#f0f6ff] min-h-screen p-4">
    <!-- 顶部标题 -->
    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-[#2b4c7e]">Heat Insights</h1>
      <p class="text-sm text-gray-700 max-w-3xl mx-auto mt-2">
        Discover interactive charts and visualizations that reveal real historical insights in heat trends and impacts.
        Click each section from the left tab to switch pages.
      </p>
    </header>

    <!-- 左侧导航菜单 -->
    <div class="absolute top-20 left-4 bg-[#3b82f6] rounded-2xl shadow-lg text-white w-52 py-4 px-3 z-10">
      <el-menu
        :default-active="activeMenu"
        class="bg-transparent border-none text-white"
        router
        active-text-color="#fff"
        background-color="transparent"
      >
        <router-link to="/heat-impact/age-sex" custom v-slot="{ navigate }">
          <el-menu-item index="age-sex" @click="navigate">
            <i class="fas fa-user mr-2"></i> Age & Sex
          </el-menu-item>
        </router-link>
        <router-link to="/heat-impact/extreme-weather" custom v-slot="{ navigate }">
          <el-menu-item index="extreme-weather" @click="navigate">
            <i class="fas fa-sun mr-2"></i> Extreme Weather
          </el-menu-item>
        </router-link>
        <router-link to="/heat-impact/heat-deaths" custom v-slot="{ navigate }">
          <el-menu-item index="heat-deaths" @click="navigate">
            <i class="fas fa-exclamation-triangle mr-2"></i> Heat Deaths
          </el-menu-item>
        </router-link>
        <router-link to="/heat-impact/heat-hospitalisations" custom v-slot="{ navigate }">
          <el-menu-item index="heat-hospitalisations" @click="navigate">
            <i class="fas fa-building mr-2"></i> Hospitalisations
          </el-menu-item>
        </router-link>
        <router-link to="/heat-impact/heatwave-duration-peak" custom v-slot="{ navigate }">
          <el-menu-item index="heatwave-duration-peak" @click="navigate">
            <i class="fas fa-clock mr-2"></i> Duration & Peak
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>

    <!-- 主体内容 -->
    <main class="ml-0 pl-60 pr-6">
      <el-main class="bg-white p-6 rounded-xl shadow-md">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isMenuVisible = ref(true)

const activeMenu = computed(() => {
  const segments = route.path.split('/')
  return segments[segments.length - 1] || 'age-sex'
})
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
  text-align: center;
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

.chart-aside {
  background-color: #5295CE;
  color: white;
  position: relative;
  transition: width 0.3s;
  overflow: hidden;
}

.el-menu {
  background-color: transparent;
  border-right: none;
  padding-top: 10px;
}

.el-menu-item {
  color: white !important;
}

.el-menu-item:hover {
  background-color: #437bb2 !important;
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
  padding: 20px;
}

.el-main>* {
  max-width: 100%;
  width: 100%;
}
</style>
