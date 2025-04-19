<template>
    <div class="items-center justify-center">
        <el-container>
            <el-header>
                <h1 class="font-bold ">Copyright Notice</h1>
            </el-header>
            <el-main>
                <p>
                    All content on this website (including but not limited to text, images, icons, audio, video, and
                    code)
                    is protected by copyright unless otherwise stated.
                    Reproduction, distribution, or commercial use without explicit written permission is strictly
                    prohibited.
                </p>
            </el-main>
            <el-footer>
                <p class="text-gray-600 text-sm mt-6">
                    © {{ currentYear }} {{ siteName }}. All rights reserved.
                </p>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const siteName = 'Melbourne Cooling Solution' 
</script>