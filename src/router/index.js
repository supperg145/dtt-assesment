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
    meta: {
      title: "Home",
    }
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    meta: {
      title: "About",
    },
  },
  {
    path: "/house/:id",
    name: "House",
    component: HouseDetail,
    props: true,
    meta: {
      title: "Details",
    },
  },
  {
    path: "/create",
    name: "Create",
    component: CreateHouse,
    meta: {
      title: "Create",
    },
  },
  {
    path: "/house/edit/:id",
    name: "Edit",
    component: EditHouse,
    props: true,
    meta: {
      title: "Edit",
    },
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404 - Page Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_API_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "House App";
});

router.beforeEach((to, from, next) => {
  const store = usePreviousPathStore(); // Get the store instance
  store.updatePreviousPath(from.fullPath); // Use the action to update previous path
  next();
});

export default router;
