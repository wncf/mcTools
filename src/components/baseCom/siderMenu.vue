<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    @select="onSelect"
  >
    <a-menu-item key="home">
      <pie-chart-outlined />
      <span>首页</span>
    </a-menu-item>
  </a-menu>
</template>
<script>
export default {
  inject: {},
  provide: {},
  props: {},
  data() {
    return {
      selectedKeys: [],
    };
  },
  computed: {},
  watch: {
    $route: {
      handler(target) {
        const name = target.name;
        this.selectedKeys = [name];
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    onSelect({ key }) {
      console.log(key, "key");
      this.$router.push({
        name: key,
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
