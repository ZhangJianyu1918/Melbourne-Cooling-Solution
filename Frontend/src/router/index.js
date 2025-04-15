import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import PersonalCoolingGuide from "@/pages/PersonalCoolingGuide.vue";
import LocalHeatLevel from "@/pages/LocalHeatLevel.vue";
import CommunitySupportPage from "@/pages/CommunitySupportPage.vue";
import PrecautionPage from "@/pages/PrecautionPage.vue";
import UHIFristAidPage from "@/pages/UHIFristAidPage.vue";
import RecoveryAndAftercarePage from "@/pages/RecoveryAndAftercarePage.vue";
import HeatImpactPage from "@/pages/HeatImpactPage.vue";
import AgeAndSexChart from "@/components/AgeAndSexChart.vue";
import HeatwaveDurationAndPeekTempsChart from "@/components/HeatwaveDurationAndPeekTempsChart.vue";
import ExtremeWeather from "@/components/ExtremeWeather.vue";
import HeatDeathsChart from "@/components/HeatDeathsChart.vue";
import HeatHospitalisationsChart from "@/components/HeatHospitalisationsChart.vue";

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
    path: "/heat-impact",
    name: "HeatImpact",
    component: HeatImpactPage,
    children: [
      {
        path: 'age-sex',
        component: AgeAndSexChart
      },
      {
        path: 'heatwave-duration-peak',
        component: HeatwaveDurationAndPeekTempsChart
      },
      {
        path: 'extreme-weather',
        component: ExtremeWeather
      },
      {
        path: 'heat-deaths',
        component: HeatDeathsChart
      },
      {
        path: 'heat-hospitalisations',
        component: HeatHospitalisationsChart
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
