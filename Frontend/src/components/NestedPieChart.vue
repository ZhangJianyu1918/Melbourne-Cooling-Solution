<template>
    <div ref="chartRef" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts';
  import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  });
  
  const chartRef = ref(null);
  let chartInstance = null;
  
  const renderChart = () => {
    if (!props.data) return;
  
    const option = {
      title: {
        text: props.data.title || 'NestedPieChart',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Age Group',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '50%'],
          label: {
            position: 'inner',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: props.data.ageGroups
        },
        {
          name: 'Gender',
          type: 'pie',
          radius: ['60%', '80%'],
          label: {
            formatter: '{b}: {d}%'
          },
          data: props.data.genderGroups
        }
      ]
    };
  
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(option);
  };
  
  onMounted(() => {
    renderChart();
  });
  
  onBeforeUnmount(() => {
    chartInstance?.dispose();
  });
  
  watch(() => props.data, () => {
    chartInstance?.dispose();
    renderChart();
  }, { deep: true });
  </script>
  