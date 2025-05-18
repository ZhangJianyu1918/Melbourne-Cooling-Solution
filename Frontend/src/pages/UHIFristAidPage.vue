<template>
    <div class="container mx-auto p-6">
        <!-- Header Section -->
        <div class="mb-8">
            <el-button type="text" @click="$router.push('/community-support')"
                style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-left /></el-icon>
                Go back to Community Support
            </el-button>
            <h1 class="text-2xl md:text-3xl font-bold text-red-600 mt-4 flex items-center">
                Melbourne UHI First Aid
            </h1>
            <el-card class="mt-4 intro-card" shadow="hover">
                <p class="text-gray-700">
                    Below is essential first aid information specific to Melbourne's Urban Heat Island (UHI) effect.
                </p>
            </el-card>
        </div>

        <!-- Main Content Cards -->
        <el-collapse class="custom-collapse mb-6">
            <!-- Heat-Related Illnesses -->
            <el-collapse-item name="1">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-warning"></i>
                        <span class="text-xl font-semibold">Recognizing Heat-Related Illnesses</span>
                    </div>
                </template>
                <el-card shadow="never" class="info-card">
                    <div class="mb-4">
                        <el-alert title="Heat Exhaustion" type="warning"
                            description="Symptoms include heavy sweating, weakness, dizziness, nausea, and headache. Move the person to a cool place and provide water."
                            :closable="false" />
                    </div>
                    <el-alert title="Heat Stroke" type="error"
                        description="Symptoms include high body temperature, confusion, rapid pulse, and unconsciousness. Call 000 immediately and cool the person with water and shade."
                        :closable="false" />
                </el-card>
            </el-collapse-item>

            <!-- Emergency First Aid Steps -->
            <el-collapse-item name="2">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-lightning"></i>
                        <span class="text-xl font-semibold">Emergency First Aid Steps</span>
                    </div>
                </template>
                <el-card shadow="never" class="info-card">
                    <el-steps direction="vertical" :active="active" finish-status="success">
                        <el-step title="Move to Shade"
                            description="Move the person to a shaded or air-conditioned area." />
                        <el-step title="Loosen Clothing"
                            description="Loosen tight clothing and remove excess layers." />
                        <el-step title="Provide Water"
                            description="Provide cool water if they are conscious and able to drink." />
                        <el-step title="Cool Down"
                            description="Use cool damp cloths, fans, or cold packs to lower body temperature." />
                        <el-step title="Call Emergency"
                            description="Call emergency services (000) if symptoms worsen." />
                    </el-steps>
                    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
                </el-card>
            </el-collapse-item>

            <!-- Preventing Heat-Related Illnesses -->
            <el-collapse-item name="3">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-circle-check"></i>
                        <span class="text-xl font-semibold">Preventing Heat-Related Illnesses</span>
                    </div>
                </template>
                <el-card shadow="never" class="info-card">
                    <el-descriptions direction="vertical" :column="1" border>
                        <el-descriptions-item label="Prevention Tips">
                            Stay hydrated by drinking plenty of water.
                        </el-descriptions-item>
                        <el-descriptions-item>
                            Avoid direct sun exposure during peak hours (10 AM - 4 PM).
                        </el-descriptions-item>
                        <el-descriptions-item>
                            Wear light-colored, loose-fitting clothing.
                        </el-descriptions-item>
                        <el-descriptions-item>
                            Use sunscreen and wear a hat when outdoors.
                        </el-descriptions-item>
                        <el-descriptions-item>
                            Check on vulnerable individuals, such as the elderly and young children.
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-phone"></i>
                        <span class="text-xl font-semibold">Additional Resources</span>
                    </div>
                </template>
                <el-card class="info-card" shadow="never">
                    <el-descriptions border>
                        <el-descriptions-item label="Emergency Contect">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('000')">
                                <a href="https://www.triplezero.gov.au/">000</a>
                                </el-button>
                        </el-descriptions-item>
                        <el-descriptions-item label="VicEmergency Hotline">
                            <el-button type="primary" size="small" plain icon="el-icon-phone">
                                <a href="https://www.cfa.vic.gov.au/contact/vicemergency-hotline">1800 226 226</a>
                            </el-button>
                        </el-descriptions-item>
                    </el-descriptions>
                    <br>
                    <el-descriptions border>
                        <el-descriptions-item label="Royal Melbourne Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('+61 (3) 9342 7000')">
                                <a href="https://www.thermh.org.au/">+61 (3) 9342 7000</a>

                            </el-button>
                            <span class="ml-2 text-gray-600">Grattan St., Parkville</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="St. Vincent's Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('+61 (3) 9288 2211')">
                                <a href="https://www.svhm.org.au/">+61 (3) 9288 2211</a>
                            </el-button>
                            <span class="ml-2 text-gray-600">Victoria Parade, Fitzroy</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="Royal Women's Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('+61 (3) 8345 2000')">
                                <a href="https://www.thewomens.org.au/">+61 (3) 8345 2000</a>
                            </el-button>
                            <span class="ml-2 text-gray-600">Grattan St & Flemington Rd, Parkville</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="Royal Dental Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('(03) 9341 1000')">
                                <a href="https://www.rdhm.org.au/">(03) 9341 1000</a>
                            </el-button>
                            <span class="ml-2 text-gray-600"><br/>720 Swanston St, Carlton</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="The Alfred Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('+61 (3) 9276 2100')">
                                <a href="https://www.alfredhealth.org.au/">+61 (3) 9276 2100</a>
                            </el-button>
                            <span class="ml-2 text-gray-600">Commercial Rd., Prahran</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="Eye and Ear Hospital">
                            <el-button type="primary" size="small" plain icon="el-icon-phone"
                                @click="callNumber('+61 (3) 9929 8666')">
                                <a href="https://eyeandear.org.au/">+61 (3) 9929 8666</a>
                                </el-button>
                            <span class="ml-2 text-gray-600"><br>32 Gisborne St., East Melbourne</span>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-collapse-item>
        </el-collapse>
        <!-- Video Resources Section -->
        <el-card shadow="hover">
            <template #header>
                <div class="section-title">
                    <i class="el-icon-video-camera"></i>
                    <span class="text-xl font-semibold text-gray-800">Video Resources</span>
                </div>
            </template>
            <search-video :keywords="['Heatstroke First Aid', 'Emergency Cooling Techniques', 'Heat Exhaustion Symptoms And Care']"></search-video>
        </el-card>

        <div style="text-align: end;">
            <el-button type="text" @click="$router.push('/community-support/recovery-and-aftercare')" style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-right /></el-icon>
                Go to next Page
            </el-button>
        </div>
    </div>
</template>

<script setup>
import SearchVideo from '../components/SearchVideo.vue';
import { ref } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const active = ref(0)

const next = () => {
    if (active.value++ > 5) active.value = 0
}
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin: auto;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 10px;
}

.info-card {
    border-radius: 8px;
    background-color: #f9fafb;
}

.intro-card {
    background-color: #f0f9ff;
    border-left: 4px solid #0ea5e9;
}

/* Custom collapse panel styles */
.custom-collapse :deep(.el-collapse-item__header) {
    background-color: white;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
}

.custom-collapse :deep(.el-collapse-item__content) {
    padding: 10px 0;
}

/* Prevention tag styles */
.prevention-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    width: 100%;
}

a {
    text-decoration: none;
}
</style>