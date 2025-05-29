<template>
  <div class="h-40 w-full">
    <a-spin :spinning="item.pingLoading">
      <a-empty
        v-if="item.pingStatus === 'pending'"
        description="等待测试开始"
        :image="simpleImage"
      />
      <template v-else-if="item.pingStatus === 'success'">
        <div class="ping_item_span" v-if="item.pingResult.favicon">
          <img
            class="w-10 h-10 rounded-xs"
            :src="item.pingResult.favicon"
            alt="favicon"
          />
        </div>
        <div class="ping_item_span" v-if="item.pingResult.description">
          <span>描述：</span>
          <span>{{ item.pingResult.description }}</span>
        </div>
        <div class="ping_item_span" v-if="item.pingResult.version">
          <span>版本：</span>
          <span>{{ item.pingResult.version }}</span>
        </div>
        <div class="ping_item_span">
          <span>在线：</span>
          <span>{{ `${item.pingResult.online}/${item.pingResult.max}` }}</span>
        </div>
        <div class="ping_item_span" v-if="item.pingResult.sample">
          <span>在线人员：</span>
          <span>{{ `${item.pingResult.sample}` }}</span>
        </div>
        <div class="ping_item_span" v-if="item.pingResult.modLength">
          <span>模组数量：</span>
          <span>{{ `${item.pingResult.modLength}` }}</span>
        </div>
      </template>
      <template v-else-if="item.pingStatus === 'error'">
        <div class="text-center py-10">{{ item.pingResult.message }}</div>
      </template>
    </a-spin>
  </div>
</template>
<script>
import { Empty } from "ant-design-vue";
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    simpleImage() {
      return Empty.PRESENTED_IMAGE_SIMPLE;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.ping_item_span {
}
</style>
