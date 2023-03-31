<script setup>
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { ref, h } from "vue";
import { NSpace, NButton, NDataTable, NIcon } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const rowProps = function (row) {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      console.log(row.id);
      // router.push(`/applications/my/${row.id}`);
    },
  };
};
const dataTableInstRef = ref(null);
const columns = ref([
  {
    title: "№ заявки",
    key: "id",
  },
  {
    title: "Название проекта",
    key: "title",
  },
  {
    title: "Конкурс",
    key: "contest.description",
  },

  {
    title: "Статус",
    key: "status",
  },
  {
    title: "Дата подписания заявки",
    key: "creationDate",
  },

  {
    title: "Дата подачи заявления",
    key: "dateOfApplicationSubmission",
  },
]);
const data = ref([]);
const filterColumn = ref();

// Vue hooks
//-------------------------------------------------------
onMounted(() => {
  // getAllApplications();
});

// API methods
//-------------------------------------------------------

async function getAllApplications() {
  await axiosClient({
    url: "/api/profile/application",
  }).then((res) => {
    if (res.data) {
      console.log(res);
      data.value = res.data;
      console.log(data.value);
    }
  });
}
</script>

<template>
  <div>
    <h4>Товары в корзине</h4>
  </div>
  <n-space vertical :size="12">
    <!-- <n-space>
      <n-button @click="sortName">Sort By Name (Ascend)</n-button>
      <n-button @click="filterAddress">Filter Address (London)</n-button>
      <n-button @click="clearFilters">Clear Filters</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
    </n-space> -->
    <n-data-table
      ref="dataTableInst"
      :columns="columns"
      :data="productStore.basketData"
      :row-props="rowProps"
    />
  </n-space>
</template>
