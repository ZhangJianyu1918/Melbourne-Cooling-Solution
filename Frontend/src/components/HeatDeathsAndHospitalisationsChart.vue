<template>
  <div>
    <h4>Heat-related deaths in Australia from 2011 to 2020</h4>
    <br>
    <bar-chart title="Heatwave Deaths" :xData="deathLabels" :seriesData="deathSeriesData"
      seriesName="Injury Deaths"></bar-chart>
    <br>
    <br>
    <h3>Heat-related injury hospitalisations in Australia from 2012 to 2021</h3>
    <br>
    <bar-chart title="Heatwave Hospitalisations" :xData="hospitalisationsLabels"
      :seriesData="hospitalisationsSeriesData" seriesName="Injury Hospitalisations"></bar-chart>
      <br>
    <p>The charts present a bigger picture of heatwave-related health impacts in Australia, highlighting both deaths
      (from 2011 to 2020) and injury-related hospitalisations (from 2012 to 2021). The most alarming spike in heatwave
      deaths occurred in the summer of 2013-14, where fatalities soared to nearly 100, which is far surpassing all other
      years in the dataset. This suggests a particularly severe event or series of compounding factors, such as
      duration, intensity, and perhaps inadequate public health response. Other notable peaks occurred in 2018-19 and
      2019-20, with death counts in the 40 to 50 range, indicating that deadly heatwaves are not a rare occurrence but a
      repeating threat.
      When it comes to hospitalisations, the trend is consistent: high and sustained rates of injury admissions due to
      heatwaves are observed from 2015-16 onwards, regularly hovering around the 800 to 900 figure. The peak occurred in
      2016–17, with over 900 hospitalisations, followed closely by 2018 to 2019. Interestingly, while deaths dropped
      significantly after 2013-14, hospitalisations did not suggest improved emergency response and awareness may be
      preventing fatalities but not necessarily reducing heat-related injuries. The most recent year shows a dip in
      hospitalisations, though it remains high at over 600, indicating persistent public health strain.
      These figures underscore the growing health burden of extreme heat events, reinforcing the need for proactive
      measures like hydration tracking, early heat stress alerts, and accessible support for vulnerable populations.
      Clearly, heatwaves are not just uncomfortable, they’re deadly and disruptive to the healthcare system.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BarChart from './BarChart.vue'
import decryptData from '@/js/decryption'

const deathLabels = ref([])
const hospitalisationsLabels = ref([])
const deathSeriesData = ref([])
const hospitalisationsSeriesData = ref([])

onMounted(() => {
  getHeatData()
})

const getHeatData = async () => {
  try {
    const hospRes = await axios.get(
      'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_hospitalisations'
    )
    const deathRes = await axios.get(
      'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_injury_deaths'
    )

    const hospData = decryptData(JSON.parse(hospRes.data.body).data)
    const deathData = decryptData(JSON.parse(deathRes.data.body).data)
    console.log(deathData)
    console.log(hospData)
    hospitalisationsLabels.value = hospData.map(item => item.year_range)
    deathLabels.value = deathData.map(item => item.year_range)
    const hospValues = hospData.map(item => item.hospitalisations)
    const deathValues = deathData.map(item => item.deaths)

    deathSeriesData.value = deathValues
    hospitalisationsSeriesData.value = hospValues
  } catch (error) {
    console.error('Error fetching heatwave data:', error)
  }
}
</script>
