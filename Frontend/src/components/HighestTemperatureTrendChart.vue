<template>
  <LineChart title="Highest Temperature Trend" :xData="labels" :seriesData="values" seriesName="Max Temperature (°C)" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import LineChart from './LineChart.vue'

const labels = ref([])
const values = ref([])

onMounted(() => {
    getHighestTemperatureTrendData()
})

const getHighestTemperatureTrendData = async () => {
  try {
    const response = await axios.get(
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_highest_temperature_trend'
    )
    const data = JSON.parse(response.data.body).data
    
    labels.value = data.map(item => item.year)
    values.value = data.map(item => item.temperature)
  } catch (error) {
    console.error('Error fetching extreme weather data:', error)
  }
}
</script>

<style scoped>

</style>