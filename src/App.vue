<template>
  <a-config-provider v-bind="globalConfig">
    <router-view></router-view>
  </a-config-provider>
</template>
<script>
import { mapActions } from "pinia";
import { useAppBaseStore } from "@/store/index";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
dayjs.locale("zh-cn");
export default {
  provide() {
    return {
      count: this.count,
    };
  },
  data() {
    return {};
  },
  computed: {
    globalConfig() {
      return {
        locale: zhCN,
        theme: {
          token: {
            colorPrimary: "#2F54EB",
            fontSize: 13,
            borderRadius: 4,
            wireframe: false,
          },
          algorithm: [],
        },
      };
    },
  },
  methods: {
    ...mapActions(useAppBaseStore, ["fetchOptioons"]),
  },
  setup() {},
  mounted() {
    this.fetchOptioons();
  },
};
</script>

<style scoped></style>
