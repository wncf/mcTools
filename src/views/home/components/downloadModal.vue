<template>
  <a-modal
    :width="800"
    :maskClosable="false"
    v-model:open="open"
    title="下载"
    :footer="null"
    @ok="handleOk"
    @cancel="onCancel"
  >
    <div class="h-full relative mc_table_body">
      <div class="absolute top-0 left-0 right-0">
        <SearchFilter
          :hideFilterItems="['searchFilter', 'categoryId']"
          v-model:query-list="queryList"
          @on-search="onSearch"
        />
      </div>
      <div class="absolute top-12 bottom-16 left-0 right-0">
        <vxe-grid
          size="mini"
          border
          height="100%"
          :loading="tableLoading"
          :columns="tableColumns"
          :data="tableData"
          :column-config="{ resizable: true }"
        >
          <template #opt="{ row }">
            <div>
              <a-button type="link" :href="row.downloadUrl">下载</a-button>
            </div>
          </template>
        </vxe-grid>
      </div>
      <div
        class="py-2 pr-2 absolute bottom-0 left-0 right-0 bg-white flex justify-end"
      >
        <a-pagination
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
const tableColumns = [
  {
    field: "displayName",
    title: "版本名称",
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
    formatter: ({ row }) => {
      return row.gameVersions[0];
    },
  },
  {
    width: 80,
    field: "modLoader",
    title: "加载器",
    formatter: ({ row }) => {
      return row.gameVersions[1];
    },
  },
  {
    width: 100,
    align: "center",
    field: "opt",
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
            const { fileDate, fileLength, ...args } = i;
            return {
              fileDate: compareTime(fileDate),
              fileLength: bytesToMB(fileLength),
              ...args,
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
<style scoped>
.mc_table_body {
  height: 500px;
}
</style>
