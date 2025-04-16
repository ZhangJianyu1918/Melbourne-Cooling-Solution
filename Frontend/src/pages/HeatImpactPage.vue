<template>
  <div class="common-layout">
    <el-container class="chart-container">
      <el-header class="chart-header">
        <h2 style="color: #19619E; font-family: Abril Fatface;">Heat Insights</h2>
        <p>
          Discover interactive charts and visualizations that reveal
          real historical insights in about heat trend and its impacts.<br />
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
            <el-menu v-show="isMenuVisible" :default-active="activeMenu" class="el-menu-vertical-demo">
              <router-link to="/heat-impact/age-sex" custom v-slot="{ navigate, href }">
                <el-menu-item :index="'age-sex'" :href="href" @click="navigate">Age & Sex</el-menu-item>
              </router-link>
              <router-link to="/heat-impact/extreme-weather" custom v-slot="{ navigate, href }">
                <el-menu-item :index="'extreme-weather'" :href="href" @click="navigate">Extreme Weather</el-menu-item>
              </router-link>
              <router-link to="/heat-impact/heat-deaths" custom v-slot="{ navigate, href }">
                <el-menu-item :index="'heat-deaths'" :href="href" @click="navigate">Heat Deaths</el-menu-item>
              </router-link>
              <router-link to="/heat-impact/heat-hospitalisations" custom v-slot="{ navigate, href }">
                <el-menu-item :index="'heat-hospitalisations'" :href="href"
                  @click="navigate">Hospitalisations</el-menu-item>
              </router-link>
              <router-link to="/heat-impact/heatwave-duration-peak" custom v-slot="{ navigate, href }">
                <el-menu-item :index="'heatwave-duration-peak'" :href="href" @click="navigate">Duration &
                  Peak</el-menu-item>
              </router-link>

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
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  flex: 1;
  overflow: auto;
  padding: 20px;
  /* 可选，增加内边距 */
}

/* 使子组件不会被拉伸 */
.el-main>* {
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
