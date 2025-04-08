<template>
    <div style="padding: 20px">
        <el-input v-model="input" placeholder="Please Input YouTube Key Word" style="width: 300px; margin-right: 10px"
            @keyup.enter="searchVideos" clearable />
        <el-button type="primary" @click="searchVideos" :loading="loading">Search</el-button>

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
import axios from 'axios';
import validateAndSanitize from '../js/validation'

const input = ref('')
const query = ref('')
const videos = ref([])
const loading = ref(false)

const searchVideos = async () => {
    if (!input.value) return

    if (!validateAndSanitize(input.value).valid) {
        alert('Please input validate places.')
        input.value = ''
        return;
    }

    loading.value = true
    const apiKey = 'AIzaSyC8ZRwMu4odONGFCfbUCIQblmDS0itPV_Y'
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(input.value)}&key=${apiKey}&maxResults=3`
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
