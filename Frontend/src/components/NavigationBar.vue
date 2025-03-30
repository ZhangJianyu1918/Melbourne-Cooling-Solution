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
          <img src="../assets/logo.png" style="width: 50px;" alt="Logo" class="logo" />
        </router-link>
      </template>
    </el-menu-item>
    <el-menu-item index="1">
      <router-link to="/" active-class="active-link">Home</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/local-heat-level" active-class="active-link">Local Heat Level</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/personal-cooling-guide" active-class="active-link">Personal Cooling Guide</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/community-support" active-class="active-link">Community Support</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const activeIndex = ref('');

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') {
      activeIndex.value = '1';
    } else if (newPath === '/local-heat-level') {
      activeIndex.value = '2';
    } else if (newPath === '/personal-cooling-guide') {
      activeIndex.value = '3';
    } else if (newPath === '/community-support') {
      activeIndex.value = '4';
    }
  },
  { immediate: true }
);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu--horizontal .el-menu-item {
  transition: background-color 0.3s ease;
}

.el-menu--horizontal .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.el-menu--horizontal .el-menu-item .router-link-active {
  background-color: rgba(25, 97, 158, 0.7);
}

a {
  text-decoration: none;
}
</style>
