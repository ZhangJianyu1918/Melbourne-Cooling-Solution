<template>
    <div class="container mx-auto p-6">
        <h2><router-link to="/community-support">Go back</router-link></h2>
        <h1 class="text-2xl font-bold text-red-600 flex items-center">
            🤕 Melbourne Recovery and Aftercare
        </h1>
        <p class="mt-4 text-gray-700">
            Below is essential information on recovery and aftercare for individuals in Melbourne following medical
            emergencies or heat-related illnesses.
        </p>

        <h2 class="text-xl font-semibold mt-6">Post-Emergency Recovery</h2>
        <p><strong>Rest and Hydration:</strong> After a medical emergency, ensure adequate rest and hydration to support
            the body's recovery.</p>
        <p><strong>Follow-Up Care:</strong> Schedule appointments with healthcare providers to monitor recovery
            progress.</p>

        <h2 class="text-xl font-semibold mt-6">Managing Long-Term Effects</h2>
        <ul class="list-disc ml-6">
            <li>Follow prescribed medication and therapy recommendations.</li>
            <li>Maintain a balanced diet and hydration levels.</li>
            <li>Engage in light physical activities as advised by doctors.</li>
            <li>Monitor symptoms and seek medical advice if conditions worsen.</li>
        </ul>

        <h2 class="text-xl font-semibold mt-6">Mental Health Support</h2>
        <ul class="list-disc ml-6">
            <li>Seek professional counseling if experiencing anxiety or PTSD.</li>
            <li>Connect with support groups for emotional assistance.</li>
            <li>Practice mindfulness and relaxation techniques.</li>
        </ul>

        <h2 class="text-xl font-semibold mt-6">Additional Resources</h2>
        <p><strong>Royal Melbourne Hospital:</strong> Call <strong>+61 (3) 9342 7000</strong> for post-treatment
            consultations.</p>
        <p><strong>Lifeline Australia:</strong> Call <strong>13 11 14</strong> for mental health and crisis support.</p>
        <p><strong>VicEmergency Hotline:</strong> Call <strong>1800 226 226</strong> for general health recovery
            guidance.</p>
        <search-video></search-video>
    </div>
</template>

<script setup>
import SearchVideo from '../components/SearchVideo.vue'
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: auto;
}
</style>