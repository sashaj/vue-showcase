<script>
import { h, defineComponent, ref, reactive } from "vue";
import { NSpace, NButton, NDataTable, NIcon } from "naive-ui";
import { SearchOutline } from "@vicons/ionicons5";

export default defineComponent({
  components: { NSpace, NButton, NDataTable, NIcon },
  setup() {
    const dataTableInstRef = ref(null);
    const columns = ref([]);
    const data = ref([]);

    const getData = (async () => {
      const fetching = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await fetching.json();

      console.log(json);

      data.value = json;
    })();

    const filterColumn = ref({
      title: "Name",
      key: "name",
      filter: "default",
      filterOptionValue: null,
      renderFilterIcon: () => {
        return h(NIcon, null, { default: () => h(SearchOutline) });
      },
      renderFilterMenu: ({ hide }) => {
        return h(
          NSpace,
          { style: { padding: "12px" }, vertical: true },
          {
            default: () => [
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = "1";
                  },
                },
                { default: () => "Filter by 1" }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = "2";
                  },
                },
                { default: () => "Filter by 2" }
              ),
              h(
                NButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = null;
                    hide();
                  },
                },
                { default: () => "clear" }
              ),
            ],
          }
        );
      },
    });

    columns.value.push(filterColumn.value);

    return {
      data,
      columns: columns,
      dataTableInst: dataTableInstRef,
      pagination: ref({ pageSize: 5 }),
      filterAddress() {
        dataTableInstRef.value.filter({
          address: ["London"],
        });
      },
      sortName() {
        dataTableInstRef.value.sort("name", "ascend");
      },
      clearFilters() {
        dataTableInstRef.value.filter(null);
      },
      clearSorter() {
        dataTableInstRef.value.sort(null);
      },
    };
  },
});
</script>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter Address (London)</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table
      ref="dataTableInst"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-space>
</template>
