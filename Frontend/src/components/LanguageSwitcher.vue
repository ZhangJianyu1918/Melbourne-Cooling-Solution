<template>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            {{ currentLabel }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="vi">Tiếng Việt</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { ref, watchEffect } from 'vue'

const { locale, t } = useI18n()

const currentLabel = ref('')

watchEffect(() => {
    switch (locale.value) {
        case 'zh':
            currentLabel.value = '中文'
            break
        case 'vi':
            currentLabel.value = 'Tiếng Việt'
            break
        default:
            currentLabel.value = 'English'
    }
})

function handleCommand(lang) {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    user-select: none;
}
</style>