<template>
  <div>
    <BarChart title="Heatwave Hospitalisations" :xData="labels" :seriesData="values"
      seriesName="Injury Hospitalisations" />
    <br>
    <p>The number of hospitalisations is generally higher than the number of deaths. However, both spike during major
      heat incidents.
      Some years show particularly large increases compared to others.
    </p>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from './BarChart.vue'
import decryptData from '@/js/decryption';

const labels = ref([])
const values = ref([])

onMounted(() => {
  getHeatHospitalisationsData()
})

const getHeatHospitalisationsData = async () => {
  try {
    const response = await axios.get(
      'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_hospitalisations'
    )
    const data = decryptData(JSON.parse(response.data.body).data)


    labels.value = data.map(item => item.year_range)
    values.value = data.map(item => item.hospitalisations)
  } catch (error) {
    console.error('Error fetching extreme weather data:', error)
  }
}
</script>

<style scoped></style>