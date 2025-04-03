<template>
    <div>
        <header class="header">
            <video autoplay loop muted class="background-video">
                <source src="../assets/home-video.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <!-- 首页专属导航栏 -->
            <nav v-if="isHome" class="home-nav">
                <ul>
                    <li>
                        <router-link to="/">HOME</router-link>
                    </li>
                    <li>
                        <router-link to="/local-heat-level">LOCAL HEAT LEVEL</router-link>
                    </li>
                    <li>
                        <router-link to="/personal-cooling-guide">PERSONAL COOLING GUIDE</router-link>
                    </li>
                    <li>
                        <router-link to="/community-support">COMMUNITY SUPPORT</router-link>
                    </li>
                </ul>
            </nav>

            <!-- 头部内容 -->
            <div class="header-content">
                <h1>Melbourne Cooling Solution</h1>
                <p>
                    With Urban Heat Island (UHI) effect disproportionately impacting local
                    areas in City of Melbourne, this tool provides personalized insights,
                    real-time heat mappings, and actionable steps to stay cool,
                    while fostering sustainable community change.
                </p>
                <div style="height: 50px;"></div>
                <el-button type="primary" class="find-out" round  size="extra-large">FIND OUT MORE</el-button>
            </div>
        </header>

        <div class="container content">
            <div style="height: 30px;"></div>
            <el-row :gutter="24">
                <el-col :span="21">
                    <h2 class="service-title">Our Service</h2>
                </el-col>
            </el-row>
            <div style="height: 30px;"></div>
            <el-row :gutter="24" justify="space-evenly">
                <el-col v-for="(service, index) in services" :key="index" :span="6" :xs="24" :sm="12" :md="8">
                    <Card :title="service.title" :image="service.image" :description="service.description"
                        :to="service.to" />
                </el-col>
            </el-row>
            <div style="height: 50px;"></div>
            <el-row>
                <el-col :span="21">
                    <h2>Need Immediate Support</h2>
                </el-col>
            </el-row>
            <div style="height: 30px;"></div>
            <el-row class="support">
                <el-col :span="16" class="support-content">
                    <p>This is the body
                        text for this section description,
                        which stands here as a placeholder for
                        later real ideas and contents:
                    </p>
                    <ul>
                        <li>
                            Bullet point 1 aka call-for-action
                            sentence 1: this is the description
                            for the first immediate action necessary link
                        </li>
                        <li>
                            Bullet point 2 aka call-for-action
                            sentence 2: this is the description
                            for the second immediate action necessary link
                        </li>
                        <li>
                            Bullet point 3 aka call-for-action
                            sentence 3: this is the description
                            for the third immediate action necessary link
                        </li>
                    </ul>
                </el-col>
                <el-col :span="8" class="support-image">
                    <img src="../assets/immediate-support.png" alt="">
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Card from '@/components/Card.vue';

// 获取当前路由，判断是否为首页
const route = useRoute();
const isHome = route.path === '/';

const services = [
    {
        image: "local-heat-level.png",
        title: "📍 Local Heat Level",
        description: "Explore real-time heat in City of Melbourne local" + 
        " areas and find the nearest shaded, cooling spaces and public centres",
        to: "local-heat-level"
        
    },
    {
        image: "personal-cooling-guide.png",
        title: "🏡 Personal Cooling Guide",
        description: "Get tailored advices based on your personal needs" + 
        " to beat the heat, elevate your health and make your living space cooler",
        to: "/personal-cooling-guide"
    },
    {
        image: "community-support.png",
        title: "🤝 Community Support",
        description: "Learn how to help yourself and others to deal with" + 
        " UHI by accessing quick-response guides and local support services",
        to: "/community-support"
    }
];
</script>

<style scoped>
/* 头部区域 */
.header {
    padding: 4rem 2rem;
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}
.background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover; 
    transform: translate(-50%, -50%);
}

/* Add this gradient overlay */
.header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%; /* You can adjust this height */
    background: linear-gradient(to top, 
                rgba(0, 0, 0, 0.7) 0%,
                rgba(0, 0, 0, 0.4) 70%, 
                rgba(0, 0, 0, 0) 100%);
    pointer-events: none; /* Makes sure clicks pass through to elements below */
    z-index: 1; /* Above the background but below the content */
}

/* Update header content to ensure it's above the gradient */
.header-content {
    margin-left: 100px;
    color: white;
    position: absolute;
    left: 0;
    top: 30%;
    padding: 10px;
    z-index: 2; /* Ensure content is above the gradient */
}

/* Also update nav to ensure it's above the gradient */
.home-nav {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2; /* Same z-index as content */
}

.home-nav ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
}

.home-nav li {
    margin-left: 2rem;
}

.home-nav a {
    color: #ffffff;
    /* 白色文字，与背景图片融合 */
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.2s;
}

.home-nav a:hover {
    color: #60a5fa;
    /* 悬停时变色 */
}

h1 {
    font-size: 5rem;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h2 {
    color: #19619E;
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Abril Fatface';
    text-align: left;
}

p {
    padding-top: 50px;
    font-size: 1.5rem;
    max-width: 1000px;
    margin: 1rem 0;
    text-align: left;
}
.el-button, .el-button.is-round {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 50px;
}
.find-out {
    font-size: 25px;
    text-align: left;
}

.cta-button:hover {
    transform: scale(1.1);
}

.el-col {
    justify-content: center;
}

/* 服务卡片区域 */
.services-section {
    padding: 2rem;
    justify-content: center;
}


.content {
    /* padding-left: 10px;
    padding-right: 10px; */
}

.support {
    background-color: white;
    /* Light blue background */
    padding: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
}

.support-content {
    padding-right: 20px;
    /* Space between text and image */
}

.support-content p {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    margin-bottom: 20px;
}

.support-content ul {
    list-style-type: disc;
    /* Bullet style */
    padding-left: 20px;
}

.support-content li {
    font-size: 14px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 10px;
}

.support-content .link {
    color: #007bff;
    /* Blue color for the link */
    text-decoration: underline;
    cursor: pointer;
}

.support-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    /* Rounded corners for the image */
    object-fit: cover;
    /* Ensure the image fits nicely */
}
</style>