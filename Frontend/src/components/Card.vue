<template>
    <div class="card-container">
        <router-link :to="to" class="card-link">
            <div class="card shadow-sm">
                <img :src="getImageUrl(image)" alt="Service Image" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">{{ t(title) }}</h5>
                    <p class="card-text">{{ t(description) }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";


defineProps({
    image: String,
    title: String,
    description: String,
    to: String
});
const { t } = useI18n()
const getImageUrl = (imagePath) => {
    return new URL(`../assets/${imagePath}`, import.meta.url).href;
};
</script>

<style scoped>
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
}

.card-link {
    text-decoration: none;
    
    /* 去除默认的链接样式 */
}

.card {
  width: auto; /* 调整宽度，原本18rem，现在变窄 */
  min-height: 20rem; /* 增加最小高度，让它更高 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 让内容均匀分布 */
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card-img-top {
  width: 100%; /* 让图片适应新宽度111 */
  height: 350px; /* 控制图片高度，避免太大 */
  object-fit: cover; /* 确保图片填充整个区域 */
  border-radius: 20px;
}
.card-title {
  font-size: 1.2rem; /* 调整标题大小 */
  text-align: center;
}

.card-text {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4; /* 行距稍微缩小 */
}


.card:hover {
    transform: scale(1.05);
    /* 鼠标悬停时放大效果 */
}
</style>