<template>
  <div class="common-layout">
    <el-container class="chart-container">
      <el-header class="chart-header">
        <h2 style="color: #19619E; font-family: Abril Fatface;">Heat Insights</h2>
        <p>
          Discover interactive charts and visualizations that reveal
          real historical insights in about heat trend and its impacts.<br/>
          Click on each section from the left tab to switch between pages.
        </p>
      </el-header>
      <el-container>
        <el-aside width="200px" class="chart-aside">
          <!-- 折叠/展开按钮 -->
          <el-button @click="isMenuVisible = !isMenuVisible" type="primary" size="small" style="margin: 10px">
            {{ isMenuVisible ? 'Hide ▲' : 'Expend ▼' }}
          </el-button>

          <!-- 菜单区域：上下折叠 -->
          <transition name="fade">
            <el-menu v-show="isMenuVisible" :default-active="activeMenu" @select="handleSelect"
              class="el-menu-vertical-demo">
              <el-menu-item index="age-sex">Age & Sex</el-menu-item>
              <el-menu-item index="extreme-weather">Extreme Weather</el-menu-item>
              <el-menu-item index="heat-deaths">Heat Deaths</el-menu-item>
              <el-menu-item index="heat-hospitalisations">Hospitalisations</el-menu-item>
              <el-menu-item index="heatwave-duration-peak">Duration & Peak</el-menu-item>
            </el-menu>
          </transition>
        </el-aside>

        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>

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

const handleSelect = (key) => {
  router.push(`/heat-impact/${key}`)
}
</script>

<style scoped>
/* 简单的淡入淡出动画效果 */
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
/* 主体区域设置居中 */
.el-main {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  flex: 1;
  overflow: auto;
  padding: 20px; /* 可选，增加内边距 */
}

/* 使子组件不会被拉伸 */
.el-main > * {
  max-width: 100%;
  width: 100%;
}
.chart-header {
  background-color: #E5F2FF;
  height: fit-content;
  word-break: break-word;
  padding-left: 40px;
  padding-top: 30px;
  padding-bottom: 20px;
}

.chart-aside {
  background-color: #5295CE;
}
</style>
