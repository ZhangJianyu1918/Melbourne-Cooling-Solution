<template>
    <div class="chart-aside">
        <el-menu :default-active="activeMenu" router active-text-color="#fff">
            <router-link to="/heat-impact/age-sex" custom v-slot="{ navigate }">
                <el-menu-item index="age-sex" @click="navigate">
                    Age & Sex
                </el-menu-item>
            </router-link>
            <router-link to="/heat-impact/extreme-weather" custom v-slot="{ navigate }">
                <el-menu-item index="extreme-weather" @click="navigate">
                    Extreme Weather
                </el-menu-item>
            </router-link>
            <router-link to="/heat-impact/heat-deaths" custom v-slot="{ navigate }">
                <el-menu-item index="heat-deaths" @click="navigate">
                    Heat Deaths
                </el-menu-item>
            </router-link>
            <router-link to="/heat-impact/heat-hospitalisations" custom v-slot="{ navigate }">
                <el-menu-item index="heat-hospitalisations" @click="navigate">
                    Hospitalisations
                </el-menu-item>
            </router-link>
            <router-link to="/heat-impact/heatwave-duration-peak" custom v-slot="{ navigate }">
                <el-menu-item index="heatwave-duration-peak" @click="navigate">
                    Duration & Peak
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()


const activeMenu = computed(() => {
  const segments = route.path.split('/')
  return segments[segments.length - 1] || 'age-sex'
})
</script>

<style scoped>
.chart-aside {
  background-color: #5295CE;
  color: white;
  position: absolute;
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
</style>