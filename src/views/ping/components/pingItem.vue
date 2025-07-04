<template>
  <div class="h-full w-full flex flex-col">
    <div
      :style="{ backgroundColor: item.themeColor || '#2f54eb' }"
      class="w-full h-10 rounded-t-md px-2 flex items-center justify-between"
    >
      <div
        class="inline-block h-2 w-2 mr-2 bg-black align-text-bottom rounded-full"
        :class="{
          'bg-gray-300': item.pingStatus === 'pending',
          'bg-red-500': item.pingStatus === 'error',
          'bg-green-500': item.pingStatus === 'success',
        }"
      ></div>
      <div class="text-white text-center text-sm truncate flex-1 px-2">
        <a-input
          :value="item.address"
          size="small"
          v-if="!item.remote"
          style="width: calc(100% - 16px)"
          placeholder="输入服务器地址"
          @change="onInputChange"
        >
        </a-input>
        <span v-else>{{ item.groupName || item.address }}</span>
      </div>
      <div class="flex gap-1">
        <a v-if="item.remote" @click="onCopyGroup('groupId')">
          <QqOutlined style="color: white; font-size: 14px" />
        </a>
        <a @click="onPing"
          ><RedoOutlined style="color: white; font-size: 14px"
        /></a>
        <a v-if="!item.remote" @click="onDeletePingItems"
          ><CloseOutlined style="color: white; font-size: 14px"
        /></a>
      </div>
    </div>
    <div class="flex-1">
      <a-spin :spinning="item.pingLoading">
        <div class="p-2">
          <!-- content -->
          <a-empty
            v-if="item.pingStatus === 'pending'"
            description="等待测试开始"
            :image="simpleImage"
          />
          <template v-if="item.pingStatus === 'success'">
            <div class="ping_item_span" v-if="item.pingResult.favicon">
              <img
                class="w-10 h-10 rounded-xs"
                :src="item.pingResult.favicon"
                alt="favicon"
              />
            </div>
            <div class="ping_item_span" v-if="item.address && item.remote">
              <span>地址：</span>
              <a @click="onCopyGroup('address')"> {{ item.address }}</a>
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
              <span>{{
                `${item.pingResult.online}/${item.pingResult.max}`
              }}</span>
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
          <template v-if="item.pingStatus === 'error'">
            <div class="ping_item_span" v-if="item.address && item.remote">
              <span>地址：</span>
              <a @click="onCopyGroup('address')"> {{ item.address }}</a>
            </div>
            <div class="ping_item_span">
              <span>请求失败：</span>
              <span>{{ item.pingResult.message }}</span>
            </div>
          </template>
        </div>
      </a-spin>
    </div>
  </div>
</template>
<script>
import { Empty } from "ant-design-vue";
import { CloseOutlined, RedoOutlined, QqOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
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
  methods: {
    onPing() {
      this.$emit("ping");
    },
    onDeletePingItems() {
      this.$emit("onRemoveItem");
    },
    onInputChange(event) {
      this.$emit("update:address", event.target.value);
      this.$nextTick(() => {
        this.$emit("changeStoreList");
      });
    },
    onCopyGroup(key) {
      navigator.clipboard.writeText(this.item[key]).then((res) => {
        message.success("复制成功");
      });
    },
  },
  setup() {
    return {
      CloseOutlined,
      RedoOutlined,
      QqOutlined,
    };
  },
};
</script>
<style scoped>
.ping_item_span {
  word-wrap: break-word;
}
</style>
