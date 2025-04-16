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
            <!-- <router-view :key="$route.fullPath"></router-view> -->
            <router-view></router-view>
          </transition>
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
  display: flex;
  flex-direction: column;
   /* 让整个布局至少占满视口高度 */
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
  min-height: 86.8vh;
  max-width: 100vw;
  flex: 1; /* 让 `el-main` 自动撑开，占据所有剩余空间 */
  --el-main-padding: none;
}

.el-footer {
  background-color: #19619E;
  color: white;
  text-align: center;
  --el-footer-height: none;
}

:deep(.fade-enter-active), :deep(.fade-leave-active) {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

:deep(.fade-enter-from), :deep(.fade-leave-to) {
  opacity: 0;
  transform: translateY(10px); /* 微小下滑 */
}

:deep(.fade-enter-to), :deep(.fade-leave-from) {
  opacity: 1;
  transform: translateY(0);
}

</style>
