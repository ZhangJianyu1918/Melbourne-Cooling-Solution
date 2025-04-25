<template>
    <MixLineAndBarChart 
        v-if="isDataReady"
        :x-data="heatwaveDurationLabels"
        :bar-data="heatwaveDurationValues"
        :line-data="heatwavePeekTempsValues"
        :bar-name="barName"
        :line-name="lineName"
        >
    </MixLineAndBarChart>
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
            'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_heatwave_duration'
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
            'https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/get_heatwave_peak_temps'
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