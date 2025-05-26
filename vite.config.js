/* eslint-disable no-undef */
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({ importStyle: "less", resolveIcons: true }),
      ],
    }),
    tailwindcss(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
      exclude: ["node_modules/**", "dist/**"], // 指定不需要检查的文件
      fix: false, // 是否自动修复
      cache: false, // 是否启用缓存
    }),
  ],
  define: {},
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
