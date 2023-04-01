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

const dataTableRef = ref(null);
const columns = ref([
  {
    title: "Название",
    key: "title",
  },
  {
    title: "Количество",
    key: "quantity",
  },
  {
    title: "Цена $",
    key: "price",
  },
  {
    title: "Рейтинг",
    key: "rating",
  },

  {
    title: "Описание",
    key: "description",
  },
]);
const data = ref([]);
const filterColumn = ref();

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
    <n-data-table
      ref="dataTableRef"
      :columns="columns"
      :data="productStore.basketData.products"
      :row-props="rowProps"
    />
    <router-link
      v-if="router.currentRoute.value.path !== '/auth'"
      :to="{ name: 'basket' }"
    >
      <n-button type="primary" size="large">Оформить</n-button>
    </router-link>
  </n-space>
</template>
