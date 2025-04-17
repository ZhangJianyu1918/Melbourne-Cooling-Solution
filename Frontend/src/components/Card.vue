<template>
    <div class="card-container" :class="`card-variant-${variant}`">
        <router-link :to="to" class="card-link">
            <div class="card shadow-sm" >
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


const props = defineProps({
    image: String,
    title: String,
    description: String,
    to: String,
    variant: String
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
}

.card {
  /* width: auto; 调整宽度，原本18rem，现在变窄 */
  /* height: 410px; */
  min-height: 410px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 让内容均匀分布 */
  align-items: center;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}
.card-variant-home .card{
    height: 410px;
}
.card-variant-community-support .card{
    height: fit-content;
}

.card-img-top {
  min-width: 250px; 
  height: 200px; 
  object-fit: cover; 
  border-radius: 20px;
}
.card-title {
  font-size: 1.2rem;
  text-align: center;
}

.card-text {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.4; 
}

.card:hover {
    transform: scale(1.05);
}
</style>