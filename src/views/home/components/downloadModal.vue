<template>
  <a-modal
    :maskClosable="false"
    v-model:open="open"
    :title="modalTitle"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
    @ok="handleOk"
    @cancel="onCancel"
  >
    <div class="h-full relative flex flex-col">
      <SearchFilter
        :hideFilterItems="['searchFilter', 'categoryId']"
        v-model:query-list="queryList"
        @on-search="onSearch"
      />
      <div class="flex-1">
        <vxe-grid
          size="mini"
          border
          height="100%"
          :loading="tableLoading"
          :columns="tableColumns"
          :data="tableData"
          :column-config="{ resizable: true }"
        >
          <template #version="{ row }">
            <template v-if="row.mcVersions.length > 1">
              <a-popover title="">
                <template #content>
                  <a-tag
                    v-for="label of row.mcVersions"
                    :key="`${row._X_ROW_KEY}_${label}`"
                    >{{ label }}</a-tag
                  >
                </template>
                <span>
                  <a-tag>{{ `${row.mcVersions[0]}++` }}</a-tag>
                </span>
              </a-popover>
            </template>
            <template v-else>
              <a-tag>{{ row.mcVersions[0] }}</a-tag>
            </template>
          </template>
          <template #modLoader="{ row }">
            <template v-if="row.mcLoadTypes.length > 1">
              <a-popover title="">
                <template #content>
                  <a-tag
                    v-for="label of row.mcLoadTypes"
                    :key="`${row._X_ROW_KEY}_${label}`"
                    >{{ label }}</a-tag
                  >
                </template>
                <span>
                  <a-tag>{{ `${row.mcLoadTypes[0]}..` }}</a-tag>
                </span>
              </a-popover>
            </template>
            <template v-else>
              <a-tag>{{ row.mcLoadTypes[0] }}</a-tag>
            </template>
          </template>
          <template #opt="{ row }">
            <div>
              <a-button type="link" :href="row.downloadUrl">下载</a-button>
            </div>
          </template>
        </vxe-grid>
      </div>
      <div class="py-2 pr-2 bg-white flex justify-end">
        <a-pagination
          :pageSizeOptions="['10', '20', '40', '50']"
          :current="currentPage"
          :page-size="queryList.pageSize"
          :total="pageTotal"
          show-less-items
          @change="onPageChnage"
        />
      </div>
    </div>
  </a-modal>
</template>
<script>
import { getMcModFiles } from "@/api/mc";
import SearchFilter from "@/components/searchFilter/index.vue";
import { compareTime } from "@/utils/date";
import { bytesToMB } from "@/utils/index";
import { mapState } from "pinia";
import { useAppBaseStore } from "@/store";
import { modLoaderOptions } from "@/config/enumOptions";
const tableColumns = [
  {
    field: "displayName",
    title: "版本名称",
    minWidth: 160,
  },
  {
    width: 160,
    field: "fileDate",
    title: "更新时间",
  },
  {
    width: 60,
    field: "fileLength",
    title: "文件大小",
  },
  {
    width: 100,
    field: "gameVersion",
    title: "游戏版本",
    slots: { default: "version" },
  },
  {
    width: 80,
    field: "modLoader",
    title: "加载器",
    slots: { default: "modLoader" },
  },
  {
    width: 80,
    align: "center",
    field: "opt",
    fixed: "right",
    title: "操作",
    slots: {
      default: "opt",
    },
  },
];
const initQueryList = (row = {}) => ({
  modeId: row.id,
  index: 0,
  pageSize: 10,
});
export default {
  components: { SearchFilter },
  inject: {},
  provide: {},
  props: {},
  data() {
    return {
      tableColumns,
      open: false,
      record: {},
      queryList: {},
      tableLoading: false,
      tableData: [],
      pageTotal: 0,
    };
  },
  computed: {
    ...mapState(useAppBaseStore, ["options"]),
    mcVersions() {
      return this.options.versionOptions.map((i) => i.value);
    },
    modLoaderTypes() {
      return modLoaderOptions.map((i) => i.title);
    },
    modalTitle() {
      return `${this.record.name} 版本列表`;
    },
    currentPage() {
      const page = this.queryList.index / this.queryList.pageSize;
      return page + 1;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onShow(row) {
      this.record = row;
      this.open = true;
      this.queryList = initQueryList(row);
      this.fetchModFields();
    },
    fetchModFields() {
      this.tableLoading = true;
      getMcModFiles(this.queryList)
        .then((res) => {
          this.pageTotal = res.pagination.totalCount;
          const records = res.data;
          this.tableData = records.map((i) => {
            const { fileDate, gameVersions, fileLength, ...args } = i;
            const versions = gameVersions || [];
            const versionData = versions.reduce(
              (acc, value) => {
                if (this.mcVersions.includes(value)) {
                  acc.versions.push(value);
                } else if (this.modLoaderTypes.includes(value)) {
                  acc.loadTypes.push(value);
                }
                return acc;
              },
              { versions: [], loadTypes: [] }
            );
            return {
              ...args,
              mcVersions: versionData.versions,
              mcLoadTypes: versionData.loadTypes,
              fileDate: compareTime(fileDate),
              fileLength: bytesToMB(fileLength),
            };
          });
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    onPageChnage(page, pageSize) {
      if (page === 1) {
        this.queryList.index = 0;
      } else {
        this.queryList.index = (page - 1) * pageSize;
      }
      this.queryList.pageSize = pageSize;
      this.fetchModFields();
    },
    handleOk() {},
    onSearch() {
      this.queryList.index = 0;
      this.fetchModFields();
    },
    onCancel() {
      this.tableData = [];
    },
  },
};
</script>
<style scoped></style>
