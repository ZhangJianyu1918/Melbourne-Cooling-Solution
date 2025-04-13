<template>
  <div>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <line-chart></line-chart>
        <bar-chart></bar-chart>
        <pie-chart></pie-chart>
      </el-main>
    </el-container>

  </div>

</template>

<script setup>
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';
</script>

<style scoped></style>
