<script setup>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.meta.isHome || false);
</script>

<template>
  <div id="app">
    <div class="common-layout">
      <el-container>
        <el-header v-if="!isHome">
          <NavigationBar />
          
        </el-header>
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <div style="height: 50px;"></div>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </div>
  </div>


</template>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 让整个布局至少占满视口高度 */
}

.el-container {
  display: flex;
  flex-direction: column;
  flex: 1; /* 让容器填充整个父容器 */
  background-color: #E5F2FF;

}
.el-header {
  --el-header-padding: none;
}
.el-main {
  flex: 1; /* 让 `el-main` 自动撑开，占据所有剩余空间 */
  --el-main-padding: none;
}

.el-footer {
  background-color: #19619E;
  color: white;
  padding: 20px;
  text-align: center;
  --el-footer-height: none;
}
/* 定义淡入淡出过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
