<template>
  <div class="h-full bg-white px-4 py-4 relative">
    <div class="h-10 flex gap-2">
      <a-button type="dashed" @click="addPingItems"
        >新增更多 <template #icon><PlusOutlined /></template
      ></a-button>
      <a-button type="default" @click="onPingServer">重新测试所有地址</a-button>
    </div>
    <div class="absolute top-10 bottom-0 left-4 right-4 overflow-y-auto">
      <a-form ref="formRef" :model="formData">
        <div class="flex flex-wrap pt-4 gap-4">
          <div
            class="w-80 border-1 p-4 border-gray-100 flex flex-col relative shadow-md"
            v-for="(item, index) of formData.pingItems"
            :key="item.key"
          >
            <a-form-item
              style="margin-bottom: 0"
              :name="['pingItems', index, 'address']"
              :rules="[
                {
                  required: true,
                  trigger: ['change', 'blur'],
                  validator: (rule, value, callback) => {
                    if (value) {
                      if (validateAddress(value)) {
                        callback(new Error('地址格式错误'));
                      } else {
                        callback();
                      }
                    } else {
                      callback();
                    }
                  },
                },
              ]"
            >
              <div
                class="inline-block h-2 w-2 mr-2 bg-black align-text-bottom rounded-full"
                :class="{
                  'bg-gray-300': item.pingStatus === 'pending',
                  'bg-red-500': item.pingStatus === 'error',
                  'bg-green-500': item.pingStatus === 'success',
                }"
              ></div>
              <a-input-search
                style="width: calc(100% - 16px)"
                placeholder="输入服务器地址"
                v-model:value="item.address"
                @search="onPingServer(index)"
                @change="onInputChange"
              >
                <template #enterButton>
                  <a-button type="primary" @click="onPingServer(index)"
                    >测试服务器</a-button
                  >
                </template>
              </a-input-search>
            </a-form-item>
            <PingItem :item="item"></PingItem>
            <span class="absolute -top-2 -right-2">
              <a-button
                size="small"
                shape="circle"
                type="primary"
                :icon="h(CloseOutlined)"
                @click="onDeletePingItems(index)"
              />
            </span>
          </div>
          <!-- <div
            class="w-40 border-1 border-gray-100 flex flex-col p-4 gap-2"
          ></div> -->
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import { uniqueId } from "xe-utils";
import { h } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { getStore, asyncStore } from "./store";
import PingItem from "./components/pingItem.vue";
import { pingJavaMc } from "@/api/mc";
import { validateAddress } from "@/utils";

export default {
  name: "pingIndex",
  inject: {},
  provide: {},
  props: {},
  components: { PingItem },
  data() {
    return {
      formData: {
        pingItems: [],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initPingIitems();
  },
  methods: {
    onInputChange(event) {
      this.asyncStoreList();
    },
    initPingIitems() {
      const baseList = getStore();
      if (Array.isArray(baseList) && baseList.length) {
        this.formData.pingItems = baseList.map((item) => ({
          key: uniqueId(),
          address: item,
          pingStatus: "pending",
          pingLoading: false,
        }));
      } else {
        this.addPingItems();
      }
    },
    addPingItems() {
      this.formData.pingItems.push({
        key: uniqueId(),
        address: "",
        pingStatus: "pending",
        pingLoading: false,
      });
    },
    asyncStoreList() {
      const { pingItems } = this.formData;
      const baseList = pingItems
        .filter((i) => i.address)
        .map((item) => item.address);
      asyncStore(baseList);
    },
    onPingServer(index) {
      if (typeof index === "number") {
        // ping one
        this.$refs.formRef
          .validate([["pingItems", index, "address"]])
          .then((res) => {
            const item = this.formData.pingItems[index];
            if (item.address) {
              item.pingLoading = true;
              this.fetchPingServer(item);
            }
          });
      } else {
        // ping all
        this.formData.pingItems.forEach((item, itemIndex) => {
          if (!validateAddress(item.address)) {
            item.pingLoading = true;
            this.fetchPingServer(item);
          } else {
            this.$refs.formRef.validate([["pingItems", itemIndex, "address"]]);
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
      this.formData.pingItems.splice(index, 1);
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
