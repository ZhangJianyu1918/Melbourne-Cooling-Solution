<template>
    <div ref="heatmapContainer" class="heatmap-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
// 定义 ref 引用
const heatmapContainer = ref(null);

onMounted(async () => {
    const chart = echarts.init(heatmapContainer.value);
    const option = {
        title: {
            top: 10,
            left: 'center',
            text: 'Daily Highest Temperature'
        },
        tooltip: {
            position: "top",
            formatter: (p) => `${p.data[0]}: ${p.data[1]} °C`,
        },
        visualMap: {
            min: 0,
            max: 50,
            calculable: true,
            orient: "horizontal",
            left: "center",
            top: 50,
        },
        calendar: {
            top: 150,
            range: ["2024-04-01", "2025-04-01"],
            cellSize: ["auto", 20],
            dayLabel: {
                nameMap: "en",
            },
            monthLabel: {
                nameMap: "en",
            },
            yearLabel: { show: false },
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: []
        }
    };
    const response = await axios.get('https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_daily_max_air_temperature');
    console.log(JSON.parse(response.data.body).data);
    const data = JSON.parse(response.data.body).data;
    let virtualData = getVirtualData(data);
    option.series.data = virtualData;
    chart.setOption(option);

});
const getVirtualData = (data) => {
    const result = [];
    data.forEach(item => {
        result.push([
            echarts.time.format(item.date, '{yyyy}-{MM}-{dd}', false),
            item.air_temp
        ]);
    })
    return result;
}
</script>

<style scoped>
.heatmap-container {
    width: 100%;
    height: 500px;
}
</style>
