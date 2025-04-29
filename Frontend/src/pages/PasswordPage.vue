<template>
  <div class="passwordForm">
    <div class="formContainer">
      <input type="password" v-model="password" placeholder="Please Input Password" />
      <button @click="checkPassword">Submit</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import Cookies from 'js-cookie'
import { ref } from 'vue'

const password = ref('');  // 用户输入的密码
const errorMessage = ref('');  // 错误信息

// 校验密码
const checkPassword = async () => {
    const response = await axios.post('https://03c5tdcr17.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/post_cookies', {'password': password.value});
    console.log(response)
    if (response.data.statusCode === 200) {
        // 如果密码正确，将认证标记保存到 Cookie
        Cookies.set('authenticated', 'true', { path: '/' })
        router.push('/home') // 跳转到受保护的页面
    } else {
        errorMessage.value = 'Password is incorrect!'; // 错误提示
    }
}


</script>

<style scoped>
/* 设置页面的高度为 100% */
.passwordForm {
    height: 80vh;
    margin: 0;
}

/* 使用 flexbox 实现全屏居中 */
.passwordForm {
    display: flex;
    justify-content: center;
    align-items: center;
}

.formContainer {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;  /* 白色背景，增强可读性 */
    width: 300px;  /* 设置表单宽度 */
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    margin-top: 10px;
    font-size: 14px;
}
</style>
