import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import PersonalCoolingGuide from "@/pages/PersonalCoolingGuide.vue";
import CommunityGuidePage from "@/pages/CommunityGuidePage.vue";
import LocalHeatLevel from "@/pages/LocalHeatLevel.vue";

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
    path: "/community-guide",
    name: "CommunityGuide",
    component: CommunityGuidePage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
