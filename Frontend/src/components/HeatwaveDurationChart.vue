<template>
  <BarChart title="Heatwave Duration" :xData="labels" :seriesData="values" seriesName="Days" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from './BarChart.vue'
import decryptData from '@/js/decryption'

const labels = ref([])
const values = ref([])

onMounted(() => {
    getHeatwaveDurationData()
})

const getHeatwaveDurationData = async () => {
  try {
    const response = await axios.get(
      'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_heatwave_duration'
    )
    const data = decryptData(JSON.parse(response.data.body).data)
    
    labels.value = data.map(item => item.year)
    values.value = data.map(item => item.duration)
  } catch (error) {
    console.error('Error fetching extreme weather data:', error)
  }
}
</script>

<style scoped>

</style>