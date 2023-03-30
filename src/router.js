import { createRouter, createWebHashHistory } from "vue-router";

// import { Role } from '@/_helpers';

// import pages
import Main from "@/pages/main/mainPage.vue";
import About from "@/pages/about/aboutPage.vue";
import Form from "@/pages/form/formPage.vue";
import Auth from "@/pages/auth/authPage.vue";
import Table from "@/pages/table/tablePage.vue";
import NotFound from "@/pages/404/404Page.vue";
import UsingStoreExample from "@/pages/pinia/piniaPage.vue";
import { useAuthStore } from "@/stores/authStore";

import ProductItemPage from "@/pages/main/productItemPage.vue";

const routes = [
  { name: "main", path: "/", component: Main, meta: { guest: true } },
  { name: "about", path: "/about", component: About, meta: { authorize: [] } },
  { name: "form", path: "/form", component: Form, meta: { authorize: [] } },
  { name: "auth", path: "/auth", component: Auth },
  { name: "table", path: "/table", component: Table, meta: { authorize: [] } },
  {
    name: "productItem",
    path: "/product/:id",
    component: ProductItemPage,
    meta: { guest: true },
  },
  {
    name: "pinia",
    path: "/pinia",
    component: UsingStoreExample,
    meta: { authorize: [] },
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
