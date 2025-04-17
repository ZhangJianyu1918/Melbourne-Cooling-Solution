<template>
    <div class="chart-aside" :class="{ collapsed: isCollapsed }">
        <div class="collapse-toggle" @click="toggleCollapse">
            <el-icon :size="30">
                <Menu/>
            </el-icon>
        </div>

        <el-menu v-if="!isCollapsed" :default-active="activeMenu" router class="custom-menu" active-text-color="#fff">
            <el-menu-item index="/heat-insights/age-sex">Age & Sex</el-menu-item>
            <el-menu-item index="/heat-insights/extreme-weather">Extreme Weather</el-menu-item>
            <el-menu-item index="/heat-insights/heat-deaths">Heat Deaths</el-menu-item>
            <el-menu-item index="/heat-insights/heat-hospitalisations">Hospitalisations</el-menu-item>
            <el-menu-item index="/heat-insights/heatwave-duration-peak">Duration & Peak</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'

const route = useRoute()

const activeMenu = computed(() => {
    const segments = route.path.split('/')
    return segments.length > 2 ? `/heat-insights/${segments[segments.length - 1]}` : '/heat-insights/age-sex'
})

const isCollapsed = ref(false)

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.chart-aside {
    background-color: #5295CE;
    color: white;
    position: fixed;
    top: 33vh;
    left: 0;
    border-radius: 0 20px 20px 0;
    z-index: 1000;
    padding: 10px;
    width: 170px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}

.chart-aside.collapsed {
    width: 60px;
    padding: 10px 5px;
    transform: translateX(-10px);
}

.collapse-toggle {
    cursor: pointer;
    padding: 5px;
    width: 120%;
    text-align: left;
    margin-left: 10px;
    transition: transform 0.3s ease;
}

.collapse-toggle:hover {
    transform: scale(1.1);
}

.custom-menu {
    background-color: inherit;
    border-right: none;
    width: 100%;
    opacity: 1;
    transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
    transform: translateX(0);
}

.chart-aside.collapsed .custom-menu {
    opacity: 0;
    transform: translateX(-20px);
    pointer-events: none;
}

.el-menu-item {
    color: white !important;
    margin: 5px 0;
    padding: 0 10px;
    min-width: 0;
    opacity: 1;
    transition: opacity 0.2s ease, background-color 0.2s ease;
}

.el-menu-item:hover {
    background-color: #437bb2 !important;
    opacity: 0.9;
}
</style>