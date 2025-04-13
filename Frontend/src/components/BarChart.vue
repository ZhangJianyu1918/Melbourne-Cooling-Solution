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
    BarChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from 'echarts/components'

// 注册 ECharts 所需组件
use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
])

// 图表配置项
const option = ref({
    title: {
        text: '访问人数统计',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['访问人数'],
        bottom: 0
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '访问人数',
            type: 'bar',
            data: [150, 230, 224, 218, 135],
            itemStyle: {
                color: '#5470C6'
            },
            barWidth: '40%',
            emphasis: {
                itemStyle: {
                    color: '#91cc75'
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