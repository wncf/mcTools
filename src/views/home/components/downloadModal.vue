<template>
  <a-modal destroyOnClose v-model:open="open" title="下载" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
<script>
export default {
  inject: {},
  provide: {},
  props: {},
  data() {
    return {
      open: false,
      record: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onShow(row) {
      this.record = row;
      this.open = true;
    },
    handleOk() {},
  },
};
</script>
<style lang="less" scoped></style>
