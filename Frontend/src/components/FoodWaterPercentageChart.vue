<template>
  <div>
    <div ref="chartRef" style="width: 100%; height: 1000px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import * as echarts from 'echarts'

const chartRef = ref(null)
const foodData = ref([])

const parseMidPercentage = (range) => {
  if (!range || !range.includes('-')) return 0
  const [start, end] = range.split('-').map(Number)
  return (start + end) / 2
}


const fetchCSV = async () => {
  const response = await fetch('/footd-water-percentage.csv') // 文件放在 public/data/food.csv
  const text = await response.text()
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  })

  const result = []

  for (const row of parsed.data) {
    const range = row['Percentage']
    const itemsRaw = row['Food Items']

    if (!range || !itemsRaw) {
      console.warn('跳过无效行:', row)
      continue
    }

    const percent = parseMidPercentage(range)
    const items = itemsRaw.split(',').map(item => item.trim())

    items.forEach(name => {
      if (name) {
        result.push({ name, percent })
      }
    })
  }

  result.sort((a, b) => b.percent - a.percent)
  foodData.value = result
}


const drawChart = () => {
  const chart = echarts.init(chartRef.value)
  const yNames = foodData.value.map(d => d.name)
  const xValues = foodData.value.map(d => d.percent)

  const option = {
    title: {
      text: 'Water Content per Food Item',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '25%',
      right: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'Water Content (%)',
      max: 100
    },
    yAxis: {
      type: 'category',
      data: yNames,
      inverse: true
    },
    series: [
      {
        type: 'bar',
        data: xValues,
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%'
        },
        itemStyle: {
          color: '#5470c6'
        }
      }
    ]
  }

  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

onMounted(async () => {
  await fetchCSV()
  drawChart()
})
</script>
