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
    const response = await axios.post('https://fuvetj5be6.execute-api.us-east-1.amazonaws.com/melbourne-cooling-solution/post_cookies', {'password': password.value});
    console.log(response)
    if (response.data.statusCode === 200) {
        // 如果密码正确，将认证标记保存到 Cookie
        Cookies.set('authenticated', 'true', { 
            path: '/', // 设置 Cookie 的路径为根目录
            expires: 0.417, // 设置 Cookie 的过期时间为 1 天
            secure: true, // 仅在 HTTPS 下发送 Cookie
            sameSite: 'Strict' // 设置 SameSite 属性为 Strict，防止 CSRF 攻击
        })
        // Cookies.set('Origin', 'http://localhost:5173', { path: '/' })
        // Cookies.set('withCredentials', 'true', { path: '/' })
        router.push('/home') // 跳转到受保护的页面
    } else {
        errorMessage.value = 'Password is incorrect!'; // 错误提示
    }
}


</script>

<style scoped>
.passwordForm {
    height: 80vh;
    margin: 0;
}

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
