<template>
  <div>
    <div ref="chartRef" style="width: 100%; height: 800px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import * as echarts from 'echarts'

const chartRef = ref(null)
const funnelData = ref([])

const parseMidPercentage = (range) => {
  if (!range || !range.includes('-')) {
    return range === "0" ? 0 : 0 // 处理只有 "0" 的情况
  }
  const [start, end] = range.split('-').map(Number)
  return (start + end) / 2
}

const fetchCSV = async () => {
  const response = await fetch('/footd-water-percentage.csv') // 替换为你的路径
  const text = await response.text()
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  })

  const tempData = []
  let i = 10
  for (const row of parsed.data) {
    const range = row['Percentage']
    const itemsRaw = row['Food Items']

    if (!range || !itemsRaw) continue

    const percent = 10 * i
    const label = range + '%\n'
    const items = itemsRaw.split(',').map(i => i.trim())

    tempData.push({
      name: label + items,
      value: percent,
      foods: items.join(', ')
    })
    i--
  }
  // 倒序排序（高含水率在漏斗顶部）
  tempData.sort((a, b) => b.value - a.value)

  funnelData.value = tempData
}

const drawChart = () => {
  const chart = echarts.init(chartRef.value)

  // const option = {
  //   title: {
  //     text: 'Water Content in Foods by Percentage Range',
  //     left: 'center'
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: ({ name, value, data }) => {
  //       return `${name}<br/>${data.foods}`
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Water Content Range',
  //       type: 'funnel',
  //       left: '10%',
  //       top: 60,
  //       bottom: 60,
  //       width: '80%',
  //       min: 0,
  //       max: 100,
  //       minSize: '0%',
  //       maxSize: '100%',
  //       sort: 'descending',
  //       label: {
  //         show: true,
  //         position: 'inside',
  //         formatter: '{b}'
  //       },
  //       labelLine: {
  //         length: 10,
  //         lineStyle: {
  //           width: 1,
  //           type: 'solid'
  //         }
  //       },
  //       itemStyle: {
  //         borderColor: '#fff',
  //         borderWidth: 1
  //       },
  //       emphasis: {
  //         label: {
  //           fontSize: 16
  //         }
  //       },
  //       data: funnelData.value,
  //       legend: {
  //         orient: 'vertical',
  //         left: 'left',
  //         data: funnelData.value.name
  //       },
  //       label: {
  //       show: true,
  //       position: 'inside'
  //     },
  //     labelLine: {
  //       length: 10,
  //       lineStyle: {
  //         width: 1,
  //         type: 'solid'
  //       }
  //     },
  //   }
  //   ]
  // }
  const option = {
    title: {
      text: 'Water Content in Foods by Percentage Range',
      subtext: '',
      left: 'center',
      top: 'top'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      data: ['Prod A', 'Prod B', 'Prod C', 'Prod D', 'Prod E']
    },
    series: [
      {
        name: 'Funnel',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '35%',
        sort: 'descending',
        funnelAlign: 'right',
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return {
              'Prod A': '📈 Max reach',
              'Prod B': '🔼 High engagement',
              'Prod C': '✅ Mid-level interest',
              'Prod D': '🧐 Low interaction',
              'Prod E': '❌ Minimal action'
            }[params.name] || params.name;
          },
          fontSize: 14,
          color: '#333',
          padding: [0, 0, 0, 10]
        },
        labelLine: {
          show: true,
          length: 30,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 16
          }
        },
        data: funnelData.value
      }
    ]
  };

  chart.setOption(option)
  window.addEventListener('resize', () => chart.resize())
}

onMounted(async () => {
  await fetchCSV()
  drawChart()
})
</script>
