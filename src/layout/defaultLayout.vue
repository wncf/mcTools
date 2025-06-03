<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header :style="headerStyle"> <SilderMenu /> </a-layout-header>
    <a-layout-content class="relative">
      <div class="absolute inset-0">
        <router-view></router-view>
      </div>
    </a-layout-content>
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
  computed: {
    headerStyle() {
      return {
        textAlign: "center",
        color: "#fff",
        height: 64,
        lineHeight: "64px",
      };
    },
  },
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
