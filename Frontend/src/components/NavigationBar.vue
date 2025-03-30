<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    style="background-color: rgba(25, 97, 158, 0.9);"
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
</style>
