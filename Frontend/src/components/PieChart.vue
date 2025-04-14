<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { onMounted, ref } from 'vue'
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
import axios from 'axios'


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
    text: 'Extreme Weather Related Injury Hospitalisations',
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
      name: [],
      type: 'pie',
      radius: '50%',
      data: [],
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

onMounted(() => {
  get_extreme_weather_related_injury_hospitalisations();
})

const get_extreme_weather_related_injury_hospitalisations = async () => {
  try {
    const response = await axios.get(
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_extreme_weather_related_injury_hospitalisations'
    );
    console.log(response.data);
    // Analysis response.body string
    const data = JSON.parse(response.data.body).data;

    // transfer to ECharts pie chart format
    option.value.series[0].data = data.map(item => ({
      name: item.weather_type,
      value: item.hospitalisations
    }));

  } catch (error) {
    console.error('Error:', error);
  }
}

</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>