<template>
    <div>
        <MixLineAndBarChart v-if="isDataReady" :x-data="heatwaveDurationLabels" :bar-data="heatwaveDurationValues"
            :line-data="heatwavePeekTempsValues" :bar-name="barName" :line-name="lineName">
        </MixLineAndBarChart>
        <p>The visualization combines a line chart showing the peak temperatures during each heatwave event with a bar
            chart underneath that displays the duration (in days) of each heatwave. This dual representation allows
            users to see both how hot and how long each heatwave lasted. A key observation is that some heatwaves have
            very high peak temperatures but are short-lived, while others may have lower peak temperatures yet last much
            longer—indicating that there isn't always a direct correlation between peak temperature and duration. This
            highlights the importance of considering both intensity and duration when assessing the impact of heatwaves,
            as a long moderate event can be just as dangerous as a short extreme one. Effective planning for both types
            is crucial for public health and infrastructure resilience.</p>
    </div>

</template>

<script setup>
import MixLineAndBarChart from './MixLineAndBarChart.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'
import decryptData from '@/js/decryption'

const heatwaveDurationLabels = ref([]);
const heatwaveDurationValues = ref([]);
const heatwavePeakTempsLabels = ref([]);
const heatwavePeekTempsValues = ref([]);
const barName = ref("Heatwave Duration");
const lineName = ref("Heatwave Peek Temps");
const isDataReady = ref(false)

onMounted(async () => {
    getHeatwavePeakTempsData();
    getHeatwaveDurationData();
    isDataReady.value = true;
});


const getHeatwaveDurationData = async () => {
    try {
        const response = await axios.get(
            'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_heatwave_duration'
        )
        const data = decryptData(JSON.parse(response.data.body).data)

        heatwaveDurationLabels.value = data.map(item => item.year)
        heatwaveDurationValues.value = data.map(item => item.duration)
    } catch (error) {
        console.error('Error fetching extreme weather data:', error)
    }
}





const getHeatwavePeakTempsData = async () => {
    try {
        const response = await axios.get(
            'https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_heatwave_peak_temps'
        )
        const data = decryptData(JSON.parse(response.data.body).data)

        heatwavePeakTempsLabels.value = data.map(item => item.year)
        heatwavePeekTempsValues.value = data.map(item => item.temperature)
    } catch (error) {
        console.error('Error fetching extreme weather data:', error)
    }
}
</script>

<style scoped></style>