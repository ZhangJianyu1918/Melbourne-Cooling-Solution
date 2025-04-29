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
  LegendComponent,
  DatasetComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent
])

const props = defineProps({
  title: String,
  series1: Array, // [{ x: '一月', y: 120 }, ...]
  series2: Array, // [{ x: '二月', y: 180 }, ...]
  seriesName: {
    type: String,
    default: 'Series 1'
  },
  seriesName2: {
    type: String,
    default: 'Series 2'
  }
})

const option = computed(() => {
  // 合并两个系列，提取唯一 x 值（作为 category）
  const xLabels = Array.from(new Set([
    ...props.series1.map(d => d.x),
    ...props.series2.map(d => d.x)
  ]))

  // 构造 dataset 源数据
  const dataMap = new Map()
  xLabels.forEach(label => {
    dataMap.set(label, { x: label, s1: null, s2: null })
  })
  props.series1.forEach(({ x, y }) => {
    if (dataMap.has(x)) dataMap.get(x).s1 = y
  })
  props.series2.forEach(({ x, y }) => {
    if (dataMap.has(x)) dataMap.get(x).s2 = y
  })

  const datasetSource = Array.from(dataMap.values())

  return {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 'bottom'
    },
    dataset: {
      source: datasetSource
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'bar',
        name: props.seriesName,
        encode: {
          x: 'x',
          y: 's1'
        },
        itemStyle: {
          color: '#5470C6'
        }
      },
      {
        type: 'bar',
        name: props.seriesName2,
        encode: {
          x: 'x',
          y: 's2'
        },
        itemStyle: {
          color: '#91CC75'
        }
      }
    ]
  }
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>
