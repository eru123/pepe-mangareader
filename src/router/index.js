import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    alias: ["/", "/home"],
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/search/:q",
    name: "Search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/manga/:manga/:chapter",
    name: "Read",
    component: () => import("@/views/Read.vue")
  },
  {
    path: "/manga/:manga",
    name: "Manga",
    component: () => import("@/views/Manga.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
