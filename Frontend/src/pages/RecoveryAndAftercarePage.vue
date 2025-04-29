<template>
    <div class="container mx-auto p-6">
        <!-- Back button and header group -->
        <div class="mb-8">
            <el-button type="text" @click="$router.push('/community-support')"
                style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-left /></el-icon>
                Go back to Community Support
            </el-button>
            <h1 class="text-2xl font-bold text-red-600 mt-4 flex items-center">
                Melbourne Recovery and Aftercare
            </h1>
            <el-divider />
        </div>

        <!-- Introduction card -->
        <el-card class="mb-6 intro-card" shadow="hover">
            <p class="text-gray-700">
                Below is essential information on recovery and aftercare for individuals in Melbourne following medical
                emergencies or heat-related illnesses.
            </p>
        </el-card>

        <!-- Content area using cards and collapse panels -->
        <el-collapse class="custom-collapse">
            <!-- Post-Emergency Recovery -->
            <el-collapse-item name="1">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-time"></i>
                        <span class="text-xl font-semibold">Post-Emergency Recovery</span>
                    </div>
                </template>
                <el-card class="mb-4 info-card" shadow="never">
                    <p><strong>Rest and Hydration:</strong> After a medical emergency, ensure adequate rest and
                        hydration to support the
                        body's recovery.</p>
                    <p><strong>Follow-Up Care:</strong> Schedule appointments with healthcare providers to monitor
                        recovery progress.
                    </p>
                </el-card>
            </el-collapse-item>

            <!-- Managing Long-Term Effects -->
            <el-collapse-item name="2">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-date"></i>
                        <span class="text-xl font-semibold">Managing Long-Term Effects</span>
                    </div>
                </template>
                <el-card class="mb-4 info-card" shadow="never">
                    <el-steps direction="vertical" :active="active" finish-status="success">
                        <el-step title="Follow Medical Advice"
                            description="Follow prescribed medication and therapy recommendations" />
                        <el-step title="Balanced Diet" description="Maintain a balanced diet and hydration levels" />
                        <el-step title="Gentle Exercise"
                            description="Engage in light physical activities as advised by doctors" />
                        <el-step title="Monitor Symptoms" description="Seek medical advice if conditions worsen" />
                    </el-steps>
                    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
                </el-card>
            </el-collapse-item>

            <!-- Mental Health Support -->
            <el-collapse-item name="3">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-user"></i>
                        <span class="text-xl font-semibold">Mental Health Support</span>
                    </div>
                </template>
                <el-card class="mb-4 info-card" shadow="never">
                    <el-tag class="mb-2" type="success">Professional Counseling</el-tag>
                    <p class="mb-3">Seek professional counseling if experiencing anxiety or PTSD.</p>

                    <el-tag class="mb-2" type="info">Support Groups</el-tag>
                    <p class="mb-3">Connect with support groups for emotional assistance.</p>

                    <el-tag class="mb-2" type="warning">Relaxation Techniques</el-tag>
                    <p>Practice mindfulness and relaxation techniques.</p>
                </el-card>
            </el-collapse-item>
        </el-collapse>

        <!-- Search video component -->
        <el-card shadow="hover">
            <template #header>
                <div class="section-title">
                    <i class="el-icon-video-camera"></i>
                    <span class="text-xl font-semibold text-gray-800">Video Resources</span>
                </div>
            </template>
            <search-video :keywords="['Post Heatwave Recovery Tips', 'Rehydration After Heat Exposure', 'Long term Effects Of Heat Stress']"></search-video>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchVideo from '../components/SearchVideo.vue';
import { ArrowLeft } from '@element-plus/icons-vue'
const active = ref(0)

const next = () => {
    if (active.value++ > 3) active.value = 0
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

/* Tag styles */
.el-tag {
    border-radius: 16px;
    padding: 0 12px;
    margin-right: 8px;
}
</style>