<template>
  <a-config-provider :locale="locale">
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
    return {
      locale: zhCN,
    };
  },
  computed: {},
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
