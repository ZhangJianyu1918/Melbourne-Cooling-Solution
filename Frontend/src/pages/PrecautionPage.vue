<template>
    <div class="container mx-auto p-6">
        <!-- Back button and header group -->
        <div class="mb-8">
            <el-button type="text" @click="$router.push('/community-support')"
                style="font: 1.2em sans-serif; padding-top: 30px;">
                <el-icon class="mr-1"><arrow-left /></el-icon>
                Go back to Community Support
            </el-button>
            <h1 class="text-2xl md:text-3xl font-bold text-red-600 mt-4 flex items-center">
                Precautions in Melbourne
            </h1>
            <el-divider />
        </div>

        <!-- Introduction card -->
        <el-card class="mb-6 intro-card" shadow="hover">
            <p class="text-gray-700">
                Below is a comprehensive list of essential precautions in Melbourne.
            </p>
        </el-card>

        <!-- Content area using cards and collapse panels -->
        <el-collapse class="custom-collapse">

            <!-- Heat Prevention General Tips -->
            <el-collapse-item name="1">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-sun"></i>
                        <span class="text-xl font-semibold">General Heat Prevention Tips</span>
                    </div>
                </template>
                <el-card class="mb-4 info-card" shadow="never">
                    <ul>
                        <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day, even if you don’t
                            feel thirsty.
                            Avoid alcohol, caffeine, and sugary drinks, as they can dehydrate you.</li>
                        <li><strong>Wear Appropriate Clothing:</strong> Choose light-colored, loose-fitting clothes made
                            of breathable
                            fabrics. Wear a wide-brimmed hat to protect your face and neck from direct sunlight. Use
                            sunscreen with at
                            least SPF 30 on exposed skin.</li>
                        <li><strong>Take Regular Breaks:</strong> Avoid strenuous activities during the hottest parts of
                            the day
                            (typically between 10 AM and 4 PM). Take breaks in a cool, shaded area to allow your body to
                            cool down.</li>
                    </ul>
                </el-card>
            </el-collapse-item>

            <!-- Heat Prevention Tips -->
            <el-collapse-item name="2">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-sun"></i>
                        <span class="text-xl font-semibold">Additional Heat Prevention Tips</span>
                    </div>
                </template>
                <el-card class="mb-4 info-card" shadow="never">
                    <ul>
                        <li><strong>Limit Sun Exposure:</strong> Stay indoors during extreme heat or take shelter in
                            air-conditioned
                            places. If you must be outside, try to stay in the shade or use a portable umbrella or hat
                            for extra
                            protection.</li>
                        <li><strong>Monitor the Weather:</strong> Stay updated on local weather conditions and heat
                            warnings through
                            services like VicEmergency or the Bureau of Meteorology. Pay attention to heatwave warnings
                            and adjust
                            your activities accordingly.</li>
                        <li><strong>Know the Symptoms of Heat Illness:</strong> Watch for signs of heat exhaustion or
                            heatstroke,
                            such as dizziness, heavy sweating, rapid pulse, nausea, confusion, or fainting. If you or
                            someone else
                            shows symptoms, move to a cooler place, hydrate, and seek medical attention immediately.
                        </li>
                    </ul>
                </el-card>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template #title>
                    <div class="section-title">
                        <i class="el-icon-sun"></i>
                        <span class="text-xl font-semibold">Outdoor Work Tips</span>
                    </div>
                </template>
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="Construction Sites / Physically Demanding Work" name="1">
                        <el-space direction="vertical" alignment="start">
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Avoid heavy labor between noon and 3 PM</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Take at least a 15-minute break every hour, preferably in the shade</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Drink plenty of water; avoid caffeinated or alcoholic beverages</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Wear breathable, light-colored clothing, a wide-brimmed hat, and sunscreen
                            </div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Watch for signs of heatstroke: dizziness, nausea, excessive sweating, or
                                confusion</div>
                        </el-space>
                    </el-collapse-item>

                    <el-collapse-item title="Gardening / Agricultural Work" name="2">
                        <el-space direction="vertical" alignment="start">
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Schedule work during early mornings or late afternoons</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Use portable shade, such as canopies or umbrellas</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Drink water every 30 minutes, even if you're not thirsty</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Stay in touch with coworkers and monitor each other’s condition</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> If feeling unwell, stop working and seek help immediately</div>
                        </el-space>
                    </el-collapse-item>

                    <el-collapse-item title="Road Maintenance / Infrastructure Inspection" name="3">
                        <el-space direction="vertical" alignment="start">
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Wear high-visibility, sun-protective workwear</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Use portable fans or misters to stay cool</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Work in shifts to reduce prolonged exposure</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Monitor equipment surface temperatures to prevent burns</div>
                            <div><el-icon>
                                    <CircleCheck />
                                </el-icon> Learn to recognize and respond to early signs of heat exhaustion and
                                heatstroke
                            </div>
                        </el-space>
                    </el-collapse-item>

                    <el-collapse-item title="Reminder" name="4">
                        <el-space direction="vertical" alignment="start">
                            <div><el-icon>
                                    <InfoFilled />
                                </el-icon> Melbourne weather can change rapidly—check official weather alerts daily
                                (e.g.,
                                BOM)</div>
                            <div><el-icon>
                                    <InfoFilled />
                                </el-icon> Always carry enough water, sunscreen, and personal cooling equipment</div>
                        </el-space>
                    </el-collapse-item>

                </el-collapse>
            </el-collapse-item>
        </el-collapse>

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
import { ArrowLeft } from '@element-plus/icons-vue'
import SearchVideo from '@/components/SearchVideo.vue';
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
    background-color: #f8fafc;
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