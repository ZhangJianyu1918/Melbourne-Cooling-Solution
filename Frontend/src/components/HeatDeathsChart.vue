<template>
  <div>
    <BarChart title="Heatwave Deaths" :xData="labels" :seriesData="values" seriesName="Injury Deaths" />
    <br>
    <p>The first graph shows the number of deaths related to heat, and the second graph  displays the number of hospitalisations caused by heat-related illnesses. Both graphs highlight the health impacts of extreme heat events over time. 
</p>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import BarChart from './BarChart.vue'
  import decryptData from '@/js/decryption'
  
  const labels = ref([])
  const values = ref([])
  
  onMounted(() => {
    getHeatDeathsData()
  })
  
  const getHeatDeathsData = async () => {
    try {
      const response = await axios.get(
        'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_deaths'
      )
      const data = decryptData(JSON.parse(response.data.body).data)
      
      
      labels.value = data.map(item => item.year_range)
      values.value = data.map(item => item.deaths)
    } catch (error) {
      console.error('Error fetching extreme weather data:', error)
    }
  }
  </script>
  
  <style scoped>
  
  </style>