<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { use } from "echarts/core"
  import VChart from 'vue-echarts'
  import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    PieChart
  } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components'
  
  // 注册组件
  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ])
  
  // 饼图配置项
  const option = ref({
    title: {
      text: '访问人数统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '访问人数',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 150, name: '1月' },
          { value: 230, name: '2月' },
          { value: 224, name: '3月' },
          { value: 218, name: '4月' },
          { value: 135, name: '5月' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
  