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

const processData = () => {
  const raw = props.data.genderGroups;

  const ageGroupMap = {};
  const ageGroups = [];
  const genderGroups = [];

  const colorPalette = [
    '#5470C6', '#91CC75', '#EE6666', '#73C0DE',
    '#FAC858', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC'
  ];

  const maleDecal = {
    symbol: 'line', // 用矩形来模拟斜线
    dashArrayX: [10, 4],
    dashArrayY: [10, 4],
    rotation: Math.PI / 4, // 45度斜线
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent'
  };

  const femaleDecal = {
    symbol: 'circle', // 点阵
    symbolSize: 2,
    dashArrayX: [2, 8],
    dashArrayY: [2, 8],
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent'
  };


  let colorIndex = 0;
  const ageColorMap = {};

  raw.forEach(item => {
    const [gender, age] = item.name.split(' ');
    const key = age;

    if (!ageGroupMap[key]) {
      ageGroupMap[key] = {
        age: key,
        male: 0,
        female: 0
      };
      ageColorMap[key] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }

    if (gender === 'Male') {
      ageGroupMap[key].male += item.value;
    } else if (gender === 'Female') {
      ageGroupMap[key].female += item.value;
    }
  });

  Object.values(ageGroupMap).forEach(group => {
    const total = group.male + group.female;

    ageGroups.push({
      name: group.age,
      value: total,
      itemStyle: {
        color: ageColorMap[group.age]
      }
    });

    genderGroups.push({
      name: `Male ${group.age}`,
      value: group.male,
      group: group.age,
      percent: ((group.male / total) * 100).toFixed(2),
      itemStyle: {
        color: ageColorMap[group.age],
        decal: maleDecal
      }
    });

    genderGroups.push({
      name: `Female ${group.age}`,
      value: group.female,
      group: group.age,
      percent: ((group.female / total) * 100).toFixed(2),
      itemStyle: {
        color: ageColorMap[group.age],
        decal: femaleDecal
      }
    });
  });

  return { ageGroups, genderGroups };
};


const renderChart = () => {
  if (!props.data) return;

  const { ageGroups, genderGroups } = processData();

  const option = {
    // title: {
    //   text: props.data.title || 'NestedPieChart',
    //   left: 'center',
    //   top: 0,
    //   padding: [0,60, 0, 0]
    // },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        if (params.seriesName === 'Gender') {
          return `${params.name}<br/>Value: ${params.value}<br/>Within Group: ${params.data.percent}%`;
        } else {
          // 内圈：年龄段
          // 需要手动计算这个年龄段占总人数的百分比
          const total = ageGroups.reduce((sum, item) => sum + item.value, 0);
          const percent = ((params.value / total) * 100).toFixed(2);
          return `${params.name}<br/>Total: ${params.value}<br/>Percentage: ${percent}%`;
        }
      }
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
        data: ageGroups
      },
      {
        name: 'Gender',
        type: 'pie',
        radius: ['60%', '80%'],
        label: {
          // formatter: '{b}: {c} ({@percent}%)'
        },
        data: genderGroups
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
