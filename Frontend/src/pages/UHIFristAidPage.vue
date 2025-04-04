<template>
    <div class="container mx-auto p-6">
        <!-- Header Section -->
        <div class="mb-8">
            <el-button type="text" @click="$router.push('/community-support')" style="font: 1.2em sans-serif; padding-top: 30px;">
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
        <el-collapse accordion class="custom-collapse mb-6">
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <el-tag effect="light" type="success" class="prevention-item">
                            Stay hydrated by drinking plenty of water.
                        </el-tag>
                        <el-tag effect="light" type="success" class="prevention-item">
                            Avoid direct sun exposure during peak hours (10 AM - 4 PM).
                        </el-tag>
                        <el-tag effect="light" type="success" class="prevention-item">
                            Wear light-colored, loose-fitting clothing.
                        </el-tag>
                        <el-tag effect="light" type="success" class="prevention-item">
                            Use sunscreen and wear a hat when outdoors.
                        </el-tag>
                        <el-tag effect="light" type="success" class="prevention-item md:col-span-2">
                            Check on vulnerable individuals, such as the elderly and young children.
                        </el-tag>
                    </div>
                </el-card>
            </el-collapse-item>
        </el-collapse>

        <!-- Additional Resources -->
        <el-card class="mb-6" shadow="hover">
            <template #header>
                <div class="section-title">
                    <i class="el-icon-phone"></i>
                    <span class="text-xl font-semibold text-blue-800">Additional Resources</span>
                </div>
            </template>
            <el-descriptions border>
                <el-descriptions-item label="VicEmergency Hotline">
                    <el-button type="warning" size="small" plain icon="el-icon-phone"
                        @click="callNumber('1800 226 226')">
                        1800 226 226
                    </el-button>
                </el-descriptions-item>
                <el-descriptions-item label="Royal Melbourne Hospital">
                    <el-button type="primary" size="small" plain icon="el-icon-phone"
                        @click="callNumber('+61 (3) 9342 7000')">
                        +61 (3) 9342 7000
                    </el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- Video Resources Section -->
        <el-card shadow="hover">
            <template #header>
                <div class="section-title">
                    <i class="el-icon-video-camera"></i>
                    <span class="text-xl font-semibold text-gray-800">Video Resources</span>
                </div>
            </template>
            <search-video></search-video>
        </el-card>
    </div>
</template>

<script setup>
import SearchVideo from '../components/SearchVideo.vue';
import { ref } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const active = ref(0)

const next = () => {
    if (active.value++ > 4) active.value = 0
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
    background-color: #fef2f2;
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
</style>