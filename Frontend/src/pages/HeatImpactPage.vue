<template>
  <div>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <line-chart></line-chart>
        <bar-chart></bar-chart>
        <extreme-weather-related-injury-hospitalisations></extreme-weather-related-injury-hospitalisations>
      </el-main>
    </el-container>

  </div>

</template>

<script setup>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import ExtremeWeatherRelatedInjuryHospitalisations from '@/components/ExtremeWeatherRelatedInjuryHospitalisations.vue';
</script>

<style scoped></style>
