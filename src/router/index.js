import baseConfig from "@/config/base.config";
import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/defaultLayout.vue"),
      redirect: "/home",
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
router.afterEach((to) => {
  const name = to.meta.title;
  document.title = `${baseConfig.appName} - ${name}`;
});
export default router;
