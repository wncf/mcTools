<template>
  <div class="h-full relative">
    <div class="absolute top-0 left-0 right-0">
      <SearchFilter v-model:query-list="queryList" @on-search="onSearch" />
    </div>
    <div class="absolute top-16 bottom-16 left-0 right-0">
      <vxe-grid
        size="mini"
        border
        height="100%"
        :column-config="{ resizable: true }"
        :data="tableData"
        :columns="columns"
        :loading="loading"
      >
        <template #modName="{ row }">
          <div class="flex gap-2 items-center">
            <img
              :key="`img_${row._X_ROW_KEY}`"
              :src="row.logo.url"
              class="w-8 h-8 object-cover border border-gray-100"
            />
            <span>{{ row.name }}</span>
          </div>
        </template>
        <template #version="{ row }">
          <a-tag v-for="item of row.tagInfo" :key="item.name">{{
            `${item.name}(${item.value})`
          }}</a-tag>
        </template>
        <template #types="{ row }">
          <div class="flex flex-wrap gap-y-2">
            <a-tag v-for="name of row.categories" :key="name">{{
              `${name} `
            }}</a-tag>
          </div>
        </template>
        <template #authors="{ row }">
          <div class="flex gap-2 items-center">
            <a-button
              :href="row.authors[0].url"
              target="_blank"
              style="padding-left: 0"
              type="link"
              >{{ row.authors[0].name }}</a-button
            >
          </div>
        </template>
        <template #opt="{ row }">
          <a-button @click="onShowDownload(row)">下载</a-button>
        </template>
      </vxe-grid>
    </div>
    <div
      class="py-2 pr-2 absolute bottom-0 left-0 right-0 bg-white flex justify-end"
    >
      <a-pagination
        :current="currentPage"
        :page-size="queryList.pageSize"
        :total="total"
        show-less-items
        @change="onPageChnage"
      />
    </div>
    <downloadModal ref="downloadModalRef" />
  </div>
</template>

<script>
import { modList } from "@/api/mc";
import { initQueryList, columns, formatterData } from "./config";
import SearchFilter from "@/components/searchFilter/index.vue";
import downloadModal from "./components/downloadModal.vue";
export default {
  name: "mainIndex",
  components: { SearchFilter, downloadModal },
  inject: {},
  provide: {},
  props: {},
  data() {
    return {
      columns: columns,
      queryList: initQueryList(),
      total: 0,
      tableData: [],
      loading: false,
    };
  },
  computed: {
    currentPage() {
      const page = this.queryList.index / this.queryList.pageSize;
      if (!page) return 1;
      return page;
    },
  },
  watch: {},
  mounted() {
    this.fetchList();
  },
  methods: {
    onShowDownload(row) {
      this.$refs.downloadModalRef.onShow(row);
    },
    onSearch() {
      this.queryList.index = 0;
      this.fetchList();
    },
    fetchList() {
      this.loading = true;
      const params = {
        ...this.queryList,
      };
      if (Array.isArray(this.queryList.categoryId)) {
        params.categoryId = params.categoryId[params.categoryId.length - 1];
      }
      modList(params)
        .then((res) => {
          this.total = res.pagination.totalCount;
          this.tableData = formatterData(res.data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onPageChnage(page, pageSize) {
      if (page === 1) {
        this.queryList.index = 0;
      } else {
        this.queryList.index = pageSize * page;
      }
      this.queryList.pageSize = pageSize;
      this.fetchList();
    },
  },
};
</script>
<style lang="less" scoped></style>
