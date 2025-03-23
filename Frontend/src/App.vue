<script setup>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <div id="app">
    <div class="common-layout">
      <el-container>
        <el-header>
          <NavigationBar />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </div>
  </div>


</template>

<style scoped>
.common-layout {
  height: 100vh; /* 占满整个视口高度 */
}

.el-container {
  height: 100%; /* 继承父容器高度 */
}

.el-main {
  padding: 20px; /* 可选：为主内容区域添加内边距 */
}
</style>
