<!-- components/ExtremeWeatherChart.vue -->
<template>
  <PieChart title="Extreme Weather Related Injury Hospitalisations" :data="chartData" />
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
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_extreme_weather_related_injury_hospitalisations'
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