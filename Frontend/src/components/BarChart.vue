<!-- components/BarChart.vue -->
<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { use } from 'echarts/core'
  import VChart from 'vue-echarts'
  import {
    BarChart
  } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  
  use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
  ])
  
  const props = defineProps({
    // title: String,
    xData: Array,
    seriesData: Array,
    seriesName: {
      type: String,
      default: 'Data'
    }
  })
  
  const option = computed(() => ({
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [props.seriesName],
      top: 'bottom'
    },
    xAxis: {
      type: 'category',
      data: props.xData
    },
    yAxis: {
      type: 'value',
      position: 'right'
    },
    series: [
      {
        name: props.seriesName,
        type: 'bar',
        data: props.seriesData,
        itemStyle: {
          color: '#5470C6'
        }
      }
    ]
  }))
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 500px;
  }
  </style>
  