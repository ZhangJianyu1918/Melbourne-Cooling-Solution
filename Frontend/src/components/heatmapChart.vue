<template>
    <div >
    <div ref="heatmapContainer" class="heatmap-container"></div>
    <p>This calendar heatmap shows each day in one year from April 2024 to March 2025, which is colored based on the highest recorded temperature. With red color indicating hotter days and blue showing cool days, it helps us quickly spot periods of extreme heat or cooler trends across the year. Although City of Melbourne is not an area with extreme heat over the year, there are clear periods where the temperatures are consistently high, usually during the summer months (December to March). The very high temperature (around 40 Celsius degrees) can happen quite suddenly which may impact people's health and adaptability. </p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import decryptData from '@/js/decryption';
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
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
                    '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
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
    const response = await axios.get('https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_daily_max_air_temperature');
    // console.log(JSON.parse(response.data.body).data);
    const data = decryptData(JSON.parse(response.data.body).data);
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
    height: 370px;
}
</style>
