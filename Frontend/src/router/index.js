import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ChecklistPage from "@/pages/ChecklistPage.vue";
import MapPage from "@/pages/MapPage.vue";
import ContributionPage from "@/pages/ContributionPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  }, 
  {
    path: "/checklist",
    name: "Checklist",
    component: ChecklistPage
  },
  {
    path: "/map",
    name: "Map",
    component: MapPage
  },
  {
    path: "/contribute",
    name: "Contribute",
    component: ContributionPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
