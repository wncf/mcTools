<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo"></div>
      <SilderMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 16px">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SilderMenu from "@/components/baseCom/siderMenu.vue";
export default {
  name: "DefaultLayout",
  components: { SilderMenu },
  inject: {},
  provide: {},
  props: {},
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
