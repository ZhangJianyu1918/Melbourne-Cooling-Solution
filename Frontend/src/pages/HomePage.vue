<template>
    <div>
        <header class="header">
            <!-- 首页专属导航栏 -->
            <nav v-if="isHome" class="home-nav">
                <router-link to="/">
                    <img src="../assets/logo.png" width="" height="40px" class="logo">
                </router-link>
                <ul>
                    <li>
                        <router-link to="/">{{ $t('navigation-home') }}</router-link>
                    </li>
                    <li>
                        <router-link to="/local-heat-level">{{ $t('navigation-local-heat-level') }}</router-link>
                    </li>
                    <li>
                        <router-link to="/personal-cooling-guide">{{ $t('navigation-personal-cooling-guide')
                            }}</router-link>
                    </li>
                    <li>
                        <router-link to="/heat-impact">Heat Insights</router-link>
                    </li>
                    <li>
                        <router-link to="/community-support">{{ $t('navigation-community-support') }}</router-link>
                    </li>
                    <!-- <li>
                        <LanguageSwitcher />
                    </li> -->
                </ul>
            </nav>

            <!-- 头部内容 -->
            <div class="header-content">
                <h1>{{ $t('home-title') }}</h1>
                <p>
                    {{ $t('home-content') }}
                </p>
                <div style="height: 50px;"></div>
                <el-button type="primary" class="find-out" tag="router-link" round  to="/local-heat-level">
                    Explore Cooling Resources
                </el-button>
                <el-button class="learn-more" round  tag="router-link" to="/community-support">
                    Learn more
                </el-button>
            </div>
        </header>

        <div class="container content">
            <div style="height: 30px;"></div>
            <el-row :gutter="24">
                <el-col :span="21">
                    <h2 class="service-title">What is Urban Heat Island?</h2>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="16">
                    <p class="">
                        Urban Heat Island (UHI) is a condition where urban 
                        areas experience significantly higher temperatures than their rural surroundings. 
                        This phenomenon is the impact from human activities, dense infrastructure, 
                        and limited vegetation. The Urban Heat Island effect is intensified by various 
                        urban design factors that trap and retain heat. Cities and metropolitan areas with 
                        concrete buildings, asphalt roads, and limited green spaces absorb and retain more 
                        heat from the sun compared to natural landscapes. This effect can increase energy 
                        demands for cooling, exacerbate air pollution, and create challenges for urban sustainability. 
                        Especially as temperatures continue to rise due to climate change.<br/>
                        <br/>
                        Source: 
                        <a href="https://geoai.au/urban-heat-island-uhi-understanding-and-technology-for-measurement/">
                        Urban Heat Island (UHI): Understanding and Technology for Measurement. 
                        Geospatial Artificial Intelligence | GeoAI
                        </a>
                    </p>
                </el-col>
                <el-col :span="8">
                    <img src="../assets/urban-heat-island.png" alt="" style="max-width: 100%;">
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="21">
                    <h2 class="service-title">{{ $t('home-service-title') }}</h2>
                </el-col>
            </el-row>
            <div style="height: 30px;"></div>
            <el-row :gutter="24" justify="space-evenly">
                <el-col v-for="(service, index) in services" :key="index" :span="6" :xs="24" :sm="12" :md="6">
                    <Card :title="service.title" :image="service.image" :description="service.description"
                        :to="service.to" :variant="service.variant"/>
                </el-col>
            </el-row>
            <div style="height: 50px;"></div>
            <el-row>
                <el-col :span="21">
                    <h2 class="service-title">Need Immediate Support</h2>
                </el-col>
            </el-row>
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
// import LanguageSwitcher from '@/components/LanguageSwitcher.vue'


const route = useRoute();
const isHome = route.path === '/';

const services = [
    {
        image: "local-heat-level.png",
        title: "service-card-local-heat-level-title",
        description: "service-card-local-heat-level-description",
        to: "/local-heat-level",
        variant: 'home'
    },
    {
        image: "personal-cooling-guide.png",
        title: "service-card-personal-cooling-guide-title",
        description: "service-card-personal-cooling-guide-description",
        to: "/personal-cooling-guide",
        variant: 'home'
    },
    {
        image: "heat-insights.png",
        title: "🔥 Heat Insights",
        description: "Discover interactive charts and visualizations that reveal real historical insights in about heat trend and its impacts",
        to: "/heat-Insights",
        variant: 'home'
    },
    {
        image: "community-support.png",
        title: "service-card-communtity-support-title",
        description: "service-card-communtity-support-description",
        to: "/community-support",
        variant: 'home'
    }
    
];

const scrollDown = () => {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth' 
    });
}
</script>

<style scoped>
/* 头部区域 */
.header {
    background-image: url('../assets/home.jpg');
    padding: 4rem 2rem;
    position: relative;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Add this gradient overlay */
.header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    /* You can adjust this height */
    background: linear-gradient(to top,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.4) 70%,
            rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
    /* Makes sure clicks pass through to elements below */
    z-index: 1;
    /* Above the background but below the content */
}

/* Update header content to ensure it's above the gradient */
.header-content {
    margin-left: 100px;
    color: white;
    position: absolute;
    left: 0;
    top: 30%;
    padding: 10px;
    z-index: 2;
    /* Ensure content is above the gradient */
}

/* Also update nav to ensure it's above the gradient */
.home-nav {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 让 logo 在左，ul 在右 */
    padding: 0.5rem 1rem;
}

.home-nav .logo {
    height: 40px;
}

.home-nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.home-nav li {
    margin: 0; /* 因为我们用了 gap，不需要单独设置 margin */
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

.service-title {
    color: #19619E;
    font-size: 3.5rem;
    font-weight: bold;
    font-family: 'Abril Fatface';
    text-align: left;
}

p {
    padding-top: 20px;
    font-size: 1rem;
    max-width: 800px;
    margin: 1rem 0;
    text-align: left;
}

.el-button,
.el-button.is-round {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 50px;
}

.find-out {
    font-size: 20px;
    text-align: left;
    text-decoration: none;
}
.learn-more {
  background: transparent;
  color: white;
  border: 1px solid white;
  text-decoration: none;
  font-size: 20px;
}

.learn-more:hover {
  background: white;
  color: #409EFF;
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

.support {
    display: flex;
    /* align-items: center; */
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