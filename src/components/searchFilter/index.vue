<template>
  <div class="py-2 px-2 bg-white flex gap-6">
    <div class="flex gap-2">
      <a-input-search
        :value="queryList.searchFilter"
        placeholder="请输入关键词..."
        style="width: 320px"
        enter-button
        @change="onValueChange($event.target.value, 'searchFilter')"
        @search="onSearch"
      >
      </a-input-search>
      <a-select
        allowClear
        :value="queryList.modLoaderType"
        style="width: 120px"
        placeholder="加载器类型"
        :options="modLoaderOptions"
        @change="onValueChange($event, 'modLoaderType')"
      ></a-select>
      <a-select
        allowClear
        :value="queryList.gameVersion"
        style="width: 120px"
        placeholder="游戏版本"
        :options="options.versionOptions"
        @change="onValueChange($event, 'gameVersion')"
      ></a-select>
      <a-cascader
        allowClear
        :value="queryList.categoryId"
        :options="options.classOptions"
        placeholder="选择模组类型"
        :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
        @change="onCascaderChange($event, 'categoryId')"
      />
    </div>
    <div class="flex gap-2">
      <a-button type="primary" :icon="h(SearchOutlined)" @click="onSearch"
        >搜索</a-button
      >
      <a-button :icon="h(RedoOutlined)" @click="onReset">重置</a-button>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useAppBaseStore } from "@/store/index";
import { h } from "vue";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons-vue";
import { modLoaderOptions } from "@/config/enumOptions";
export default {
  name: "searchFilter",
  props: {
    queryList: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:queryList", "onSearch"],
  data() {
    return {};
  },
  computed: {
    ...mapState(useAppBaseStore, ["options"]),
  },
  watch: {},
  created() {},
  mounted() {
    // console.log(this.options, "options");
  },
  methods: {
    onSearch() {
      this.$emit("onSearch");
    },
    onReset() {
      this.$emit("update:queryList", {
        ...this.queryList,
        categoryId: 0,
        searchFilter: "",
        gameVersion: null,
        modLoaderType: null,
      });
      this.onSearch();
    },
    onValueChange(value, key) {
      this.$emit("update:queryList", {
        ...this.queryList,
        [key]: value,
      });
    },
    onCascaderChange(value, key) {
      this.onValueChange(value, key);
    },
  },
  setup() {
    return {
      h,
      SearchOutlined,
      RedoOutlined,
      modLoaderOptions,
    };
  },
};
</script>
