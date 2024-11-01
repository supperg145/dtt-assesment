// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { usePreviousPathStore } from "@/stores/navigationStore"; // Adjust the import as necessary
import HomePage from "../views/HousesPage.vue";
import AboutPage from "../views/AboutPage.vue";
import HouseDetail from "../views/HouseDetail.vue";
import CreateHouse from "@/views/CreateHouse.vue";
import EditHouse from "@/views/EditHouse.vue";
import NotFound from "@/views/NotFound.vue";

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
  const store = usePreviousPathStore(); // Get the store instance
  store.updatePreviousPath(from.fullPath); // Use the action to update previous path
  next();
});

export default router;
