import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/UserAccount.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authRequiredRoutes = ["Home", "Account"];
  const authNotRequiredRoutes = ["Login"];
  const _isAuthenticated = store.getters._isAuthenticated;

  if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

  if (authRequiredRoutes.indexOf(to.name) > -1) {
    if (_isAuthenticated) next();
    else next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
