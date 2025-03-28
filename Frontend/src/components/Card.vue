<template>
    <router-link :to="to" class="card-link">
      <div class="card shadow-sm rounded" style="width: 18rem;">
        <img :src="getImageUrl(image)" alt="Service Image" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{ description }}</p>
        </div>
      </div>
    </router-link>
  </template>

<script setup>
defineProps({
    image: String,
    title: String,
    description: String,
    to: String
});
const getImageUrl = (imagePath) => {
    return new URL(`../assets/${imagePath}`, import.meta.url).href;
};
</script>

<style scoped>
.card-link {
  text-decoration: none; /* 去除默认的链接样式 */
}

.card {
  transition: transform 0.3s ease; /* 添加动画效果 */
}

.card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大效果 */
}
</style>