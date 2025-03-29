<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    :class="{'navigation-bar-home': isHome, 'navigation-bar-default': !isHome}"
  >
    <el-menu-item index="0">
      <template #title>
        <router-link to="/">
          <img src="../assets/logo.png" style="width: 50px;"  alt="Logo" class="logo" />
        </router-link>
      </template>
    </el-menu-item>
    <el-menu-item index="1">
      <router-link to="/">Home</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/local-heat-level">Local Heat Level</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/personal-cooling-guide">Personal Cooling Guide</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/community-support">Community Support</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const isHome = computed(() => route.path === '/');

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
a {
  text-decoration: none;
}

/* 主页时导航栏完全透明 */
.navigation-bar-home {
  background-color: transparent !important;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  border-bottom: none !important;
}

/* 默认导航栏样式（其他页面） */
.navigation-bar-default {
  background-color: rgba(25, 97, 158, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}

/* 主页滚动时，逐渐显示背景色 */
.navigation-bar-home.scrolled {
  background-color: rgba(25, 97, 158, 0.9);
  transition: background-color 0.3s ease-in-out;
}
</style>
