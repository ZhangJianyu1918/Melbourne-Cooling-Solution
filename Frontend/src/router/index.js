import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import PersonalCoolingGuide from "@/pages/PersonalCoolingGuide.vue";
import LocalHeatLevel from "@/pages/LocalHeatLevel.vue";
import CommunitySupportPage from "@/pages/CommunitySupportPage.vue";
import PrecautionPage from "@/pages/PrecautionPage.vue";
import UHIFristAidPage from "@/pages/UHIFristAidPage.vue";
import RecoveryAndAftercarePage from "@/pages/RecoveryAndAftercarePage.vue";
import AgeAndSexChart from "@/components/AgeAndSexChart.vue";
import HeatwaveDurationAndPeekTempsChart from "@/components/HeatwaveDurationAndPeekTempsChart.vue";
import ExtremeWeather from "@/components/ExtremeWeather.vue";
import HeatDeathsChart from "@/components/HeatDeathsChart.vue";
import HeatHospitalisationsChart from "@/components/HeatHospitalisationsChart.vue";
import CopyRightPage from "@/pages/CopyRightPage.vue";
import HeatInsightsPage from "@/pages/HeatInsightsPage.vue";
import HeatmapChart from "@/components/heatmapChart.vue";
import PasswordPage from "@/pages/PasswordPage.vue";
import Cookies from "js-cookie";


const routes = [
  {
    path: "/",
    name: "Password",
    component: PasswordPage,
    meta: { isHome: true }
  }, 
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: { isHome: true, requiresAuth: true }
  }, 
  {
    path: "/local-heat-level",
    name: "LocalHeatLevel",
    component: LocalHeatLevel,
    meta: { requiresAuth: true }
  },
  {
    path: "/personal-cooling-guide",
    name: "PersonalCoolingGuide",
    component: PersonalCoolingGuide,
    meta: { requiresAuth: true }
  },
  {
    path: "/community-support",
    name: "CommunitySupport",
    component: CommunitySupportPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/copyright',
    name: 'CopyRightPage',
    component: CopyRightPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/community-support/precaution",
    name: "Precaution",
    component: PrecautionPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/community-support/uhi-first-aid",
    name: "UHIFirstAid",
    component: UHIFristAidPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/community-support/recovery-and-aftercare",
    name: "RecoveryAndAftercare",
    component: RecoveryAndAftercarePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/heat-insights",
    name: "HeatInsights",
    component: HeatInsightsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',  
        redirect: '/heat-insights/age-sex'
      },
      {
        path: 'age-sex',
        name: 'AgeAndSexChart',
        component: AgeAndSexChart
      },
      {
        path: 'heatwave-duration-peak',
        name: 'HeatwaveDurationAndPeekTempsChart',
        component: HeatwaveDurationAndPeekTempsChart
      },
      {
        path: 'extreme-weather',
        name: 'ExtremeWeather',
        component: ExtremeWeather
      },
      {
        path: 'heat-deaths',
        name: 'HeatDeathsChart',
        component: HeatDeathsChart
      },
      {
        path: 'heat-hospitalisations',
        name: 'HeatHospitalisationsChart',
        component: HeatHospitalisationsChart
      },
      {
        path: 'heatmap',
        name: 'HeatMap',
        component: HeatmapChart
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 检查目标页面是否需要认证权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authenticated = Cookies.get('authenticated')

    // 如果用户已认证且 Cookie 存在
    if (authenticated === 'true') {
      next()  // 已认证，允许访问目标页面
    } else {
      next({ name: 'Password' })  // 未认证，跳回密码页面
    }
  } else if (to.name === 'Password') {
    // 如果用户已经认证，并且尝试访问密码页面，跳转到受保护的页面
    const authenticated = Cookies.get('authenticated')
    if (authenticated === 'true') {
      next({ name: 'Home' })  // 已认证，跳到受保护页面
    } else {
      next()  // 未认证，允许访问密码页面
    }
  } else {
    next()  // 不需要认证的页面直接访问
  }
})


export default router;
