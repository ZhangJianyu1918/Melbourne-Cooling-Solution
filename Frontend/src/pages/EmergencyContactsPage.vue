<template>
    <div class="container mx-auto p-6">
        <h2><router-link to="/community-support">Go back</router-link></h2>
        <h1 class="text-2xl font-bold text-red-600 flex items-center">
            🚑 Emergency Contacts
        </h1>
        <p class="mt-4 text-gray-700">
            Below is a comprehensive list of essential emergency contacts in Melbourne.
        </p>

        <h2 class="text-xl font-semibold mt-6">Immediate Emergencies (Life-Threatening Situations)</h2>
        <p><strong>Police, Fire, Ambulance:</strong> Dial <strong>000</strong> for immediate assistance in
            life-threatening or time-critical emergencies. This service is available 24/7 and is free of charge.</p>

        <h2 class="text-xl font-semibold mt-6">Non-Emergency Situations</h2>
        <p><strong>Police Assistance Line:</strong> Call <strong>131 444</strong> for non-urgent police matters such as
            reporting a crime that has already occurred, lost property, or general inquiries.</p>

        <h2 class="text-xl font-semibold mt-6">State Emergency Service (SES)</h2>
        <p><strong>Flood, Storm, and Earthquake Assistance:</strong> Contact SES at <strong>132 500</strong> for
            non-life-threatening situations related to natural disasters.</p>

        <h2 class="text-xl font-semibold mt-6">Crisis Support and Mental Health</h2>
        <p><strong>Lifeline:</strong> For 24/7 crisis support and suicide prevention services, call <strong>13 11
                14</strong>.</p>

        <h2 class="text-xl font-semibold mt-6">Hospitals in Melbourne</h2>
        <ul class="list-disc ml-6">
            <li><strong>Royal Melbourne Hospital:</strong> Grattan St., Parkville. Phone: +61 (3) 9342 7000</li>
            <li><strong>St. Vincent's Hospital:</strong> Victoria Parade, Fitzroy. Phone: +61 (3) 9288 2211</li>
            <li><strong>Royal Women's Hospital:</strong> Corner of Grattan St and Flemington Rd, Parkville. Phone: +61
                (3) 8345 2000</li>
            <li><strong>Royal Dental Hospital:</strong> 720 Swanston Street, Carlton. Phone: (03) 9341 1000</li>
            <li><strong>The Alfred Hospital:</strong> Commercial Rd., Prahran. Phone: +61 (3) 9276 2100</li>
            <li><strong>Eye and Ear Hospital:</strong> 32 Gisborne St., East Melbourne. Phone: +61 (3) 9929 8666</li>
        </ul>

        <h2 class="text-xl font-semibold mt-6">Additional Resources</h2>
        <p><strong>VicEmergency Hotline:</strong> Call <strong>1800 226 226</strong> for information during emergencies
            such as bushfires or floods.</p>
        <p><strong>National Security Hotline:</strong> Call <strong>1800 123 400</strong> to report possible signs of
            terrorism or for national security matters.</p>

        <h2 class="text-xl font-semibold mt-6">Important Notes</h2>
        <p><strong>Mobile Phones:</strong> Dial <strong>112</strong> on mobile devices, which redirects to
            <strong>000</strong> in Australia.</p>
        <p><strong>Hearing or Speech Impairments:</strong> Contact emergency services through the National Relay Service
            by dialing <strong>106</strong>.</p>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: auto;
}
</style>