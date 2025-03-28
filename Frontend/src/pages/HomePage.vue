<template>
    <div>
      <header class="header">
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
            With Urban Heat Island (UHI) effect disproportionately impacting local areas in City of Melbourne, this tool provides personalized insights, real-time heat mappings, and actionable steps to stay cool, while fostering sustainable community change.
          </p>
          <el-button type="primary" round>FIND OUT MORE</el-button>
        </div>
      </header>
      
      <div class="content">
        <el-row>
          <el-col :offset="3">
            <h3>Our Service</h3>
          </el-col>
        </el-row>
        
        <el-row :gutter="24">
          <el-col
            v-for="(service, index) in services"
            :key="index"
            :span="8"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <Card
              :title="service.title"
              :image="service.image"
              :description="service.description"
              :icon="service.icon"
            />
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :offset="3">
            <h3>Need Immediate Support</h3>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="16">
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
          <el-col :span="8">
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
      description: "Explore real-time heat in City of Melbourne local areas and find the nearest shaded, cooling spaces and public centres"
    },
    {
      image: "personal-cooling-guide.png",
      title: "🏡 Personal Cooling Guide",
      description: "Get tailored advices based on your personal needs to beat the heat, elevate your health and make your living space cooler"
    },
    {
      image: "community-support.png",
      title: "🤝 Community Support",
      description: "Learn how to help yourself and others to deal with UHI by accessing quick-response guides and local support services"
    }
  ];
  </script>
  
  <style scoped>
  /* 头部区域 */
  .header {
    background-image: url("../assets/home.png");
    background-size: cover;
    background-position: center;
    text-align: center;
    padding: 4rem 2rem;
    position: relative;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* 首页专属导航栏 */
  .home-nav {
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
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
    color: #ffffff; /* 白色文字，与背景图片融合 */
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    transition: color 0.2s;
  }
  
  .home-nav a:hover {
    color: #60a5fa; /* 悬停时变色 */
  }
  
  /* 头部内容 */
  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 1.1rem;
    margin: 1rem 0;
  }
  
  /* 按钮样式（Element Plus 的按钮已使用 el-button，此处样式可移除） */
  .cta-button {
    background-color: #1e3a8a;
    color: #ffffff;
    border: none;
    padding: 1rem 2rem;
    border-radius: 50%;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .cta-button:hover {
    transform: scale(1.1);
  }
  
  /* 服务卡片区域 */
  .services-section {
    padding: 2rem;
  }
  
  .services {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .content {
    padding-left: 100px;
    padding-right: 100px;
    background-color: rgba(229, 242, 255);
  }
  </style>
  