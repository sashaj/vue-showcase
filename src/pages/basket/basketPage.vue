<script setup>
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { usePiniaExampleStore } from "@/stores/piniaExampleStore";
import { ref, h } from "vue";
import { NSpace, NButton, NDataTable, NIcon } from "naive-ui";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const rowProps = function (row) {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      console.log(row.id);

      router.push(`/applications/my/${row.id}`);
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
  // {
  //   title: "Направления",
  //   key: "directions",
  // },
  {
    title: "Статус",
    key: "status",
  },
  {
    title: "Дата подписания заявки",
    key: "creationDate",
  },
  // {
  //   title: "Запрашиваемая сумма",
  //   key: "requestedMoney",
  // },
  // {
  //   title: "Сумма кофинансирования",
  //   key: "coFinancingMoney",
  // },
  {
    title: "Дата подачи заявления",
    key: "dateOfApplicationSubmission",
  },
  // {
  //   title: "Дата начала проекта",
  //   key: "dateOfProjectBeginning",
  // },
  // {
  //   title: "Дата закрытия проекта",
  //   key: "dateOfProjectEnding",
  // },
  // {
  //   title: "Бюджет",
  //   key: "budget",
  // },
  // {
  //   title: "Описание проекта",
  //   key: "description",
  // },
  // {
  //   title: "Цели проекта",
  //   key: "goals",
  // },
  // {
  //   title: "Обоснование проекта",
  //   key: "justification",
  // },
  // {
  //   title: "Локация проекта",
  //   key: "targetGroups",
  // },
  // {
  //   title: "Календарный план",
  //   key: "taskCalendar",
  // },
  // {
  //   title: "Задачи проекта",
  //   key: "tasks",
  // },
]);
const data = ref([]);
const filterColumn = ref();

// Vue hooks
//-------------------------------------------------------
onMounted(() => {
  getAllApplications();
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
    <h4>Мои заявки</h4>
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
      :data="data"
      :row-props="rowProps"
    />
  </n-space>
</template>
