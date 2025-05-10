<template>
    <div class="container">
        <el-button type="text" @click="$router.push('/personal-cooling-guide')"
            style="font: 1.2em sans-serif; padding-top: 30px;">
            <el-icon class="mr-1"><arrow-left /></el-icon>
            Go back to Personal Guide Page
        </el-button>
        <h1>My Heat Health</h1>
        <p>Stay ahead of the heat with personalised health tips. This tool helps you track hydration, spot early signs
            of heat stress, and get advice to stay safe during hot weather. Fill in the form to get your advice!</p>
        <div>
            <el-row justify="space-evenly">
              <el-col :span="12"></el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"></el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>