<template>
  <div class="h-full bg-white px-2 py-2 relative">
    <div class="h-10 flex gap-2">
      <a-button type="dashed" @click="addPingItems"
        >新增更多 <template #icon><PlusOutlined /></template
      ></a-button>
      <a-button type="default" @click="onPingServer">重新测试所有地址</a-button>
    </div>
    <div class="absolute top-10 bottom-0 left-2 right-2 overflow-y-auto pb-2">
      <div class="flex flex-wrap pt-4 gap-4">
        <div
          class="w-65 h-60 border-1 rounded-md border-gray-100 flex flex-col relative shadow-md"
          v-for="(item, index) of pingItems"
          :key="item.key"
        >
          <PingItem
            :item="item"
            v-model:address="item.address"
            @onRemoveItem="onDeletePingItems(index)"
            @ping="onPingServer(index)"
            @changeStoreList="asyncStoreList"
          >
          </PingItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { h } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { getStore, asyncStore } from "./store";
import PingItem from "./components/pingItem.vue";
import { pingJavaMc, getMcList } from "@/api/mc";
import { serverListFormatter, validateAddress } from "@/utils";
import { uniqueId } from "xe-utils";

export default {
  name: "pingIndex",
  inject: {},
  provide: {},
  props: {},
  components: { PingItem },
  data() {
    return {
      pingItems: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initPingIitems();
  },
  methods: {
    async initPingIitems() {
      const baseList = getStore();
      const key = this.$route.params.id || "";
      const { data: serverList } = await getMcList({
        key: key,
      });
      if ((Array.isArray(baseList) && baseList.length) || serverList.length) {
        const servers = serverListFormatter([...serverList, ...baseList]);
        console.log(servers, "servers");
        this.pingItems = servers;
      } else {
        this.addPingItems();
      }
    },
    addPingItems() {
      this.pingItems.push({
        key: uniqueId(),
        address: "",
        pingStatus: "pending",
        pingLoading: false,
      });
    },
    asyncStoreList() {
      const baseList = this.pingItems
        .filter((i) => i.address && !i.remote)
        .map((item) => item.address);
      asyncStore(baseList);
    },
    onPingServer(index) {
      if (typeof index === "number") {
        const item = this.pingItems[index];
        if (item.address) {
          item.pingLoading = true;
          this.fetchPingServer(item);
        }
      } else {
        this.pingItems.forEach((item) => {
          if (!validateAddress(item.address)) {
            item.pingLoading = true;
            this.fetchPingServer(item);
          }
        });
      }
    },
    fetchPingServer(item) {
      const [ip, port] = item.address.split(":");
      pingJavaMc({ host: ip, port: port })
        .then((res) => {
          if (res.code === 200) {
            item.pingStatus = "success";
            item.pingResult = res.data;
          } else {
            item.pingStatus = "error";
            item.pingResult = {
              message: res.message,
            };
          }
        })
        .catch((e) => {
          item.pingStatus = "error";
          item.pingResult = {
            message: e.message || "请求失败",
          };
        })
        .finally(() => {
          item.pingLoading = false;
        });
    },
    onDeletePingItems(index) {
      this.pingItems.splice(index, 1);
      this.asyncStoreList();
    },
  },
  setup() {
    return {
      h,
      CloseOutlined,
      validateAddress,
    };
  },
};
</script>
<style scoped></style>
