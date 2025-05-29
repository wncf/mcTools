<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    @select="onSelect"
  >
    <a-menu-item key="home">
      <DownloadOutlined />
      <span>下载模组</span>
    </a-menu-item>
    <a-menu-item key="ping">
      <LineChartOutlined />
      <span>测试服务器地址</span>
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
      this.$router.push({
        name: key,
      });
    },
  },
};
</script>
<style lang="less" scoped></style>
