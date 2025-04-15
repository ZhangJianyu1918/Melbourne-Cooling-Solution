<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" @select="handleSelect" class="el-menu-vertical-demo">
          <el-menu-item index="age-sex">Age & Sex</el-menu-item>
          <el-menu-item index="extreme-weather">Extreme Weather</el-menu-item>
          <el-menu-item index="heat-deaths">Heat Deaths</el-menu-item>
          <el-menu-item index="heat-hospitalisations">Hospitalisations</el-menu-item>
          <el-menu-item index="heatwave-duration-peak">Duration & Peak</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="chart">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
console.log('menu loaded')
const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => {
  // 返回路由的最后一个 path 片段
  const segments = route.path.split('/')
  return segments[segments.length - 1] || 'age-sex'
})

const handleSelect = (key) => {
  router.push(`/heat-impact/${key}`)
}
</script>

<style scoped>
.chart {
  background-color: white;
}
</style>
