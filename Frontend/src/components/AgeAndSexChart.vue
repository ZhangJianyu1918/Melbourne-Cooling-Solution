<template>
  <NestedPieChart :data="chartData" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NestedPieChart from './NestedPieChart.vue';
import axios from 'axios'
import decryptData from '@/js/decryption'


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
    
    const data = decryptData(JSON.parse(response.data.body).data);


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
    console.log(genderGroups)

    chartData.value = {
      title: 'Nested pie chart of age group and gender distribution',
      ageGroups,
      genderGroups
    };
    
  } catch (error) {
    console.error('Error fetching age and sex data:', error);
  }
};

// const getAgeAndSexData = async () => {
//   try {
//     const response = await axios.get(
//       'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_age_groups_and_sex'
//     );
    
//     const data = JSON.parse(response.data.body).data;

//     // 提取年龄分组的顺序
//     const ageOrder = data
//       .filter(item => item.sex === 'Persons')
//       .map(item => item.age_group);

//     // 生成内圈数据（总人数）
//     const ageGroups = ageOrder.map(age => {
//       const item = data.find(d => d.sex === 'Persons' && d.age_group === age);
//       return {
//         name: age,
//         value: item ? item.count : 0
//       };
//     });

//     // 生成外圈数据，计算每个性别在该年龄段的百分比
//     const genderGroups = [];
//     ageOrder.forEach(age => {
//       const totalItem = data.find(d => d.sex === 'Persons' && d.age_group === age);
//       const total = totalItem ? totalItem.count : 1; // 防止除以 0

//       ['Male', 'Female'].forEach(sex => {
//         const item = data.find(d => d.sex === sex && d.age_group === age);
//         const count = item ? item.count : 0;
//         const percent = parseFloat(((count / total) * 100).toFixed(2)); // 保留两位小数

//         genderGroups.push({
//           name: `${sex} ${age}`,
//           value: percent
//         });
//       });
//     });

//     chartData.value = {
//       title: 'Nested pie chart of age group and gender distribution',
//       ageGroups,
//       genderGroups
//     };
    
//   } catch (error) {
//     console.error('Error fetching age and sex data:', error);
//   }
// };


</script>

<style scoped>

</style>