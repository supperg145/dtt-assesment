import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HousesPage.vue"; // Import HomePage
import AboutPage from "../views/AboutPage.vue"; // Import AboutPage
import HouseDetail from "../views/HouseDetail.vue"; // Import HouseDetail
import CreateHouse from "@/views/CreateHouse.vue"; // Import CreateHouse
import EditHouse from "@/views/EditHouse.vue"; // Import EditHouse
import NotFound from "@/views/NotFound.vue"; // Import NotFound

import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/house/:id",
    name: "House",
    component: HouseDetail,
    props: true,
  },
  {
    path: "/create",
    name: "Create",
    component: CreateHouse,
  },
  {
    path: "/house/edit/:id",
    name: "Edit",
    component: EditHouse,
    props: true,
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("navigation/updatePreviousPath", from.fullPath);
  next();
});

export default router;
