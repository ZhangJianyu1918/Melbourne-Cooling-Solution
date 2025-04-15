<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="age-sex" @select="handleSelect" class="el-menu-vertical-demo">
          <el-menu-item index="age-sex">Age & Sex</el-menu-item>
          <el-menu-item index="heatwave-duration">Heatwave Duration</el-menu-item>
          <el-menu-item index="extreme-weather">Extreme Weather</el-menu-item>
          <el-menu-item index="heat-deaths">Heat Deaths</el-menu-item>
          <el-menu-item index="heat-hospitalisations">Hospitalisations</el-menu-item>
          <el-menu-item index="heatwave-peak-temps">Peak Temperatures</el-menu-item>
          <el-menu-item index="heatwave-duration-peak">Duration & Peak</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <age-and-sex-chart></age-and-sex-chart> -->
        <!-- <highest-temperature-trend-chart></highest-temperature-trend-chart> -->
        <!-- <heatwave-duration-chart></heatwave-duration-chart>
        <extreme-weather></extreme-weather>
        <heat-deaths-chart></heat-deaths-chart>
        <heat-hospitalisations-chart></heat-hospitalisations-chart>
        <heatwave-peak-temps-chart></heatwave-peak-temps-chart>
        <heatwave-duration-and-peek-temps-chart></heatwave-duration-and-peek-temps-chart> -->
        <router-view />
      </el-main>
    </el-container>
  </div>

</template>

<script setup>
// import HighestTemperatureTrendChart from '@/components/HighestTemperatureTrendChart.vue';
// import HeatwaveDurationChart from '@/components/HeatwaveDurationChart.vue';
// import ExtremeWeather from '@/components/ExtremeWeather.vue';
// import HeatDeathsChart from '@/components/HeatDeathsChart.vue';
// import HeatHospitalisationsChart from '@/components/HeatHospitalisationsChart.vue';
// import HeatwavePeakTempsChart from '@/components/HeatwavePeakTempsChart.vue';
// import AgeAndSexChart from '@/components/AgeAndSexChart.vue';
// import HeatwaveDurationAndPeekTempsChart from '@/components/HeatwaveDurationAndPeekTempsChart.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const handleSelect = (key) => {
  router.push(`/${key}`)
}
</script>

<style scoped></style>
