<template>
    <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'

// 接收父组件传来的 props
const props = defineProps({
    xData: {
        type: Array,
        required: true
    },
    barData: {
        type: Array,
        required: true
    },
    lineData: {
        type: Array,
        required: true
    },
    barName: {
        type: String,
        default: 'Bar Chart'
    },
    lineName: {
        type: String,
        default: 'Line Chart'
    }
})

const chartRef = ref(null)
let chartInstance = null

const renderChart = () => {
    if (!chartInstance) return
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: [props.barName, props.lineName]
        },
        xAxis: {
            type: 'category',
            data: props.xData
        },
        yAxis: [
            {
                type: 'value',
                name: props.barName,
                position: 'left'
            },
            {
                type: 'value',
                name: props.lineName,
                position: 'right'
            }
        ],
        series: [
            {
                name: props.barName,
                type: 'bar',
                data: props.barData
            },
            {
                name: props.lineName,
                type: 'line',
                yAxisIndex: 1,
                data: props.lineData
            }
        ]
    }

    chartInstance.setOption(option)
}

const initChart = () => {
    if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value)
        renderChart()
        window.addEventListener('resize', resizeChart)
    }
}

const resizeChart = () => {
    if (chartInstance) {
        chartInstance.resize()
    }
}

onMounted(() => {
    initChart()
})

// 响应式更新
watch(
    () => [props.xData, props.barData, props.lineData],
    () => {
        renderChart()
    },
    { deep: true }
)

onBeforeUnmount(() => {
    if (chartInstance) {
        window.removeEventListener('resize', resizeChart)
        chartInstance.dispose()
    }
})
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 500px;
}
</style>