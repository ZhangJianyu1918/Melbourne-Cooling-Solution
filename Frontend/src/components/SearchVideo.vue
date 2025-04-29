<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <el-button 
        v-for="keyword in keywords" 
        :key="keyword" 
        type="primary" 
        @click="searchVideos(keyword)" 
        :loading="loading"
        style="margin-right: 10px"
      >
        {{ keyword }}
      </el-button>
    </div>

    <el-scrollbar style="margin-top: 20px; overflow-x: auto">
      <div class="video-container">
        <el-card v-for="video in videos" :key="video.id.videoId" class="video-card" shadow="hover">
          <iframe width="350" height="200" :src="`https://www.youtube.com/embed/${video.id.videoId}`"
            frameborder="0" allowfullscreen></iframe>
          <div style="margin-top: 10px; font-weight: bold; font-size: 14px">
            {{ video.snippet.title }}
          </div>
        </el-card>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import axios from 'axios'
import validateAndSanitize from '../js/validation'

const props = defineProps({
  keywords: {
    type: Array,
    required: true
  }
})

const videos = ref([])
const loading = ref(false)
const videoKey = import.meta.env.VITE_GOOGLE_API_KEY

const searchVideos = async (keyword) => {
  if (!validateAndSanitize(keyword).valid) {
    alert('Please input valid keyword.')
    return;
  }

  loading.value = true
  const apiKey = videoKey
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(keyword)}&key=${apiKey}&maxResults=3`
  try {
    const response = await axios.get(url)
    videos.value = response.data.items
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.video-container {
  display: flex;
  gap: 16px;
}

.video-card {
  width: 360px;
  display: inline-block;
  flex-shrink: 0;
}
</style>
