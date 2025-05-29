import baseConfig from "@/config/base.config";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/defaultLayout.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: "首页",
          },
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "/ping",
          name: "ping",
          meta: {
            title: "服务器状态",
          },
          component: () => import("@/views/ping/index.vue"),
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next({ path: "/home" });
  } else {
    next();
  }
});
router.afterEach((to) => {
  const name = to.meta.title;
  document.title = `${baseConfig.appName} - ${name}`;
});
export default router;
