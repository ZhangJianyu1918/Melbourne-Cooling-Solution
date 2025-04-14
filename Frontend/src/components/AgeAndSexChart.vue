<template>
  <NestedPieChart :data="chartData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NestedPieChart from './NestedPieChart.vue';
import axios from 'axios'


const chartData = ref({
    'title': 'Nested pie chart of age group and gender distribution',
    'ageGroups': [],
    'genderGroups': []
})

onMounted(() => {
    getAgeAndSexData()
})

const getAgeAndSexData = async () => {
  try {
    const response = await axios.get(
      'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_age_groups_and_sex'
    );
    
    const data = JSON.parse(response.data.body).data;


    // 提取年龄分组的顺序
    const ageOrder = data
      .filter(item => item.sex === 'Persons')
      .map(item => item.age_group);

    // 生成内圈数据
    const ageGroups = ageOrder.map(age => {
      const item = data.find(d => d.sex === 'Persons' && d.age_group === age);
      return {
        name: age,
        value: item ? item.count : 0
      };
    });

    // 生成外圈数据，按照年龄顺序，嵌套 Male 和 Female
    const genderGroups = [];
    ageOrder.forEach(age => {
      ['Male', 'Female'].forEach(sex => {
        const item = data.find(d => d.sex === sex && d.age_group === age);
        genderGroups.push({
          name: `${sex} ${age}`,
          value: item ? item.count : 0
        });
      });
    });

    chartData.value = {
      title: 'Nested pie chart of age group and gender distribution',
      ageGroups,
      genderGroups
    };

  } catch (error) {
    console.error('Error fetching age and sex data:', error);
  }
};

</script>

<style scoped>

</style>