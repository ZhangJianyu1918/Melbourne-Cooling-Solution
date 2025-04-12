import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import PersonalCoolingGuide from "@/pages/PersonalCoolingGuide.vue";
import LocalHeatLevel from "@/pages/LocalHeatLevel.vue";
import CommunitySupportPage from "@/pages/CommunitySupportPage.vue";
import PrecautionPage from "@/pages/PrecautionPage.vue";
import UHIFristAidPage from "@/pages/UHIFristAidPage.vue";
import RecoveryAndAftercarePage from "@/pages/RecoveryAndAftercarePage.vue";
import ChatPage from "@/pages/HeatImpactPage.vue";

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
    path: "/chat",
    name: "Chat",
    component: ChatPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
