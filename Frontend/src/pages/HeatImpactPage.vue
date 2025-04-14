<template>
  <div>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <highest-temperature-trend-chart></highest-temperature-trend-chart>
        <heatwave-duration-chart></heatwave-duration-chart>
        <extreme-weather></extreme-weather>
        <heat-deaths-chart></heat-deaths-chart>
        <heat-hospitalisations-chart></heat-hospitalisations-chart>
        <heatwave-peak-temps-chart></heatwave-peak-temps-chart>
      </el-main>
    </el-container>

  </div>

</template>

<script setup>
import HighestTemperatureTrendChart from '@/components/HighestTemperatureTrendChart.vue';
import HeatwaveDurationChart from '@/components/HeatwaveDurationChart.vue';
import ExtremeWeather from '@/components/ExtremeWeather.vue';
import HeatDeathsChart from '@/components/HeatDeathsChart.vue';
import HeatHospitalisationsChart from '@/components/HeatHospitalisationsChart.vue';
import HeatwavePeakTempsChart from '@/components/HeatwavePeakTempsChart.vue';

</script>

<style scoped></style>
