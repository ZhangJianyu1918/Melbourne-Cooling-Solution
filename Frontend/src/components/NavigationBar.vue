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
      <router-link to="/" active-class="active-link">
        <img src="../assets/logo.png" width="" height="40px" class="logo">
      </router-link>
    </el-menu-item>
    <el-menu-item index="1">
      <router-link to="/" active-class="active-link">{{ $t('navigation-home') }}</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/local-heat-level" active-class="active-link">{{ $t('navigation-local-heat-level') }}</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/personal-cooling-guide" active-class="active-link">{{ $t('navigation-personal-cooling-guide') }}</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/heat-insights" active-class="active-link">Heat Insights</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <router-link to="/community-support" active-class="active-link">{{ $t('navigation-community-support') }}</router-link>
    </el-menu-item>
    <!-- <el-menu-item index="5">
      <LanguageSwitcher />
    </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
// import LanguageSwitcher from '@/components/LanguageSwitcher.vue'


const route = useRoute();

const activeIndex = ref('1'); // Default to 'Home'

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/' || newPath === '') {
      activeIndex.value = '1'; // Home
    } else if (newPath.startsWith('/local-heat-level')) {
      activeIndex.value = '2'; // Local Heat Level
    } else if (newPath.startsWith('/personal-cooling-guide')) {
      activeIndex.value = '3'; // Personal Cooling Guide
    } else if (newPath.startsWith('/heat-insights')) {
      activeIndex.value = '4'; // Heat Impact (including sub-routes)
    } else if (newPath.startsWith('/community-support')) {
      activeIndex.value = '5'; // Community Support
    } else {
      activeIndex.value = ''; // No highlight for unmatched routes
    }
  },
  { immediate: true }
);

const handleSelect = (key, keyPath) => {
  activeIndex.value = key;
  console.log(key, keyPath);
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
}
.el-menu--horizontal {
  width: 100%;  
  height: 60px;
  background-color: rgba(25, 97, 158, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-evenly; 
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.el-menu--horizontal .el-menu-item {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: color 0.2s;
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

.el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: #ffffff !important;
  font-weight: bold;
  border-bottom: 3px solid #ffffff;
}


a.router-link-active {
  color: #ffcc00 !important;
  font-weight: bold;
}
</style>
