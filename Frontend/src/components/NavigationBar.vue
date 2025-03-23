<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <template #title>
          <img src="../assets/logo.png" style="width: 50px;"  alt="Logo" class="logo" />
        </template>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/checklist">Checklist</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/map">Map</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/contribute">Contribution</router-link>
      </el-menu-item>
    </el-menu>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
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