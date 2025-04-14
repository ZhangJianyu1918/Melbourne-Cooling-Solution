<template>
    <BarChart title="Heatwave Deaths" :xData="labels" :seriesData="values" seriesName="Injury Deaths" />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import BarChart from './BarChart.vue'
  
  const labels = ref([])
  const values = ref([])
  
  onMounted(() => {
    getHeatDeathsData()
  })
  
  const getHeatDeathsData = async () => {
    try {
      const response = await axios.get(
        'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_deaths'
      )
      const data = JSON.parse(response.data.body).data
      
      
      labels.value = data.map(item => item.year_range)
      values.value = data.map(item => item.deaths)
    } catch (error) {
      console.error('Error fetching extreme weather data:', error)
    }
  }
  </script>
  
  <style scoped>
  
  </style>