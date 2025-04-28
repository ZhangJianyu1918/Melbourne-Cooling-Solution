<template>
  <div class="statistic-wrapper">
    <div class="statistic-title">{{ title }}</div>
    <div
      class="statistic-value"
      :style="{ color: currentColor }"
    >
      {{ displayValue }}{{ unit }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { CountUp } from 'countup.js';

const props = defineProps({
  title: String,
  value: Number,
  unit: {
    type: String,
    default: '', // 比如传 "M" 或 "mi"
  },
  decimals: {
    type: Number,
    default: 1,
  },
});

const displayValue = ref(0);
const currentColor = ref('#409EFF'); // 默认 Element Plus 主色调

const animateValue = (val) => {
  const countUp = new CountUp(displayValue, val, {
    duration: 2,
    separator: ',',
    decimalPlaces: props.decimals,
  });

  if (!countUp.error) {
    countUp.start(() => {
      displayValue.value = countUp.endVal;
    });
  } else {
    console.error(countUp.error);
    displayValue.value = val;
  }
};

const updateColor = (val) => {
  // 简单根据大小变色，也可以用 HSL 动态调色
  if (val > 1000) {
    currentColor.value = 'rgb(51.2, 126.4, 204)'; // 红
  } else if (val > 500) {
    currentColor.value = 'rgb(121.3, 187.1, 255)'; // 橙
  } else {
    currentColor.value = 'rgb(159.5, 206.5, 255)'; // 绿
  }
};

onMounted(() => {
  animateValue(props.value);
  updateColor(props.value);
});

watch(() => props.value, (newVal) => {
  animateValue(newVal);
  updateColor(newVal);
});
</script>

<style scoped>
.statistic-wrapper {
  text-align: center;
}
.statistic-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
}
.statistic-value {
  font-size: 24px;
  font-weight: bold;
  transition: color 0.5s ease;
}
</style>
