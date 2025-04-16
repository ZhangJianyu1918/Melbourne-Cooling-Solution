<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div class="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center">
            <h1 class="text-3xl font-bold mb-4">Copyright Notice</h1>
            <p class="text-gray-700 text-base leading-relaxed">
                All content on this website (including but not limited to text, images, icons, audio, video, and code)
                is protected by copyright unless otherwise stated.
                Reproduction, distribution, or commercial use without explicit written permission is strictly
                prohibited.
            </p>
            <p class="text-gray-600 text-sm mt-6">
                © {{ currentYear }} {{ siteName }}. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const siteName = 'Melbourne Cooling Solution' 
</script>