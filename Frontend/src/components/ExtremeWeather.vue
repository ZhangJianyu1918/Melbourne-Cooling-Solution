<!-- components/ExtremeWeatherChart.vue -->
<template>
  <div>
    <PieChart title="Extreme Weather Related Injury Hospitalisations" :data="chartData" />
    <p>This pie chart shows the proportion of injury hospitalisations caused by different types of extreme weather over the last decade. Surprisingly, Heat is the dominant force taking nearly 80% of all extreme weather injury hospitalisations, far outpaces injury from other causes. Although Cold and Bushfire injuries make up a noticeable chunk, they are much less common in total. 
This dangerous impact from heatwaves underlines an urgent need for heat resilience strategies such as better infrastructure, early warnings, public education, and support systems during heat events.
</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PieChart from './PieChart.vue'
import decryptData from '@/js/decryption'

const chartData = ref([])

onMounted(() => {
  getExtremeWeatherData()
})

const getExtremeWeatherData = async () => {
  try {
    const response = await axios.get(
      'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_extreme_weather_related_injury_hospitalisations'
    )
    const data = decryptData(JSON.parse(response.data.body).data)
    console.log(data);
    // 转换为 PieChart 所需格式
    chartData.value = data.map(item => ({
      name: item.weather_type,
      value: item.hospitalisations
    }))
  } catch (error) {
    console.error('Error fetching extreme weather data:', error)
  }
}
</script>