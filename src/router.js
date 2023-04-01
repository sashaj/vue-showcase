import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// import { Role } from '@/_helpers';

// import pages
import Main from "@/pages/main/mainPage.vue";
import Auth from "@/pages/auth/authPage.vue";
import NotFound from "@/pages/404/404Page.vue";
import Basket from "@/pages/basket/basketPage.vue";
import ProductItemPage from "@/pages/main/productItemPage.vue";

const routes = [
  { name: "main", path: "/", component: Main, meta: { guest: true } },

  { name: "auth", path: "/auth", component: Auth },

  {
    name: "productItem",
    path: "/product/:id",
    component: ProductItemPage,
    meta: { guest: true },
  },
  {
    name: "basket",
    path: "/basket",
    component: Basket,
    meta: { guest: true },
  },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name) {
    // Start the route progress bar.
    window.$loadingBar.start();
  }

  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  authStore.getCurrentUser();
  const currentUser = authStore.currentUserAuthData;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/auth", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length) {
      // && !authorize.includes(currentUser.role)
      // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});

router.afterEach((to, from) => {
  window.$loadingBar.finish();
});

export default router;
