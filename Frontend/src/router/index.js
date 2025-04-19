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

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { isHome: true }
  }, 
  {
    path: "/local-heat-level",
    name: "LocalHeatLevel",
    component: LocalHeatLevel
  },
  {
    path: "/personal-cooling-guide",
    name: "PersonalCoolingGuide",
    component: PersonalCoolingGuide
  },
  {
    path: "/community-support",
    name: "CommunitySupport",
    component: CommunitySupportPage,
  },
  {
    path: '/copyright',
    name: 'CopyRightPage',
    component: CopyRightPage
  },
  {
    path: "/community-support/precaution",
    name: "Precaution",
    component: PrecautionPage
  },
  {
    path: "/community-support/uhi-first-aid",
    name: "UHIFirstAid",
    component: UHIFristAidPage
  },
  {
    path: "/community-support/recovery-and-aftercare",
    name: "RecoveryAndAftercare",
    component: RecoveryAndAftercarePage
  },
  {
    path: "/heat-insights",
    name: "HeatInsights",
    component: HeatInsightsPage,
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

export default router;
