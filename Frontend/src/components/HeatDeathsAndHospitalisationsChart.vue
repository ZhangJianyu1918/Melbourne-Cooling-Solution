<template>
  <TwoBarChart 
    v-if="seriesData.length === 2"
    title="Heatwave Hospitalisations and Deaths" 
    :series1="seriesData[0]"
    :series2="seriesData[1]" 
    :seriesName="'Hospitalisations'" 
    :seriesName2="'Death'" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TwoBarChart from './TwoBarChart.vue'
import decryptData from '@/js/decryption'

const labels = ref([])
const seriesData = ref([]) // 用于存储两个系列

onMounted(() => {
  getHeatData()
})

const getHeatData = async () => {
  try {
    const hospRes = await axios.get(
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_hospitalisations'
    )
    const deathRes = await axios.get(
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_deaths'
    )

    const hospData = decryptData(JSON.parse(hospRes.data.body).data)
    const deathData = decryptData(JSON.parse(deathRes.data.body).data)
    console.log(deathData)
    console.log(hospData)
    labels.value = hospData.map(item => item.year_range)
    const hospValues = hospData.map(item => item.hospitalisations)
    const deathValues = deathData.map(item => item.deaths)

    seriesData.value = [hospValues, deathValues]
  } catch (error) {
    console.error('Error fetching heatwave data:', error)
  }
}
</script>
