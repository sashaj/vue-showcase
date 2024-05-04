<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import productItem from "../../components/productItem.vue";
import {
  NCard,
  NInput,
  NButton,
  NRate,
  NSpace,
  NCheckbox,
  NCheckboxGroup,
  NGi,
  NGrid,
} from "naive-ui";
import { useRouter, useRoute } from "vue-router";

const productStore = useProductStore();

const productData = ref([]);
const virginProductData = ref(null);
const searchModel = ref({ filter: null, search: null, sort: null });
const searchInitValues = ref({ filter: [], sort: ["По рейтингу", "По цене"] });

//-------------------------------------------------------------------
//Logic functions

function search() {
  productData.value = [...virginProductData.value];
  if (searchModel.value.search) {
    productData.value = productData.value.filter((item) => {
      if (item.title) {
        return item.title
          .toLowerCase()
          .includes(searchModel.value.search.toLowerCase());
      }
    });
  }
}

function filter(value) {
  productData.value = [...virginProductData.value];
  if (value.length > 0) {
    productData.value = productData.value.filter((item) => {
      return item.category === value[0];
    });
  }
}

function sort(value) {
  productData.value = [...virginProductData.value];
  if (value.length > 0) {
    productData.value = productData.value.sort((a, b) => {
      if (value[0] === "По цене") {
        return a.price - b.price;
      } else if (value[0] === "По рейтингу") {
        return a.rating - b.rating;
      }
    });
  }
}

//-------------------------------------------------------------------
//Api methods

async function getProductsAll() {
  await axiosClient({
    url: "/products",
  })
    .then((res) => {
      for (let i = 0; i < res.data.products.length; i++) {
        res.data.products[i].quantity = 1;
      }
      productData.value = [...res.data.products];
      virginProductData.value = [...res.data.products];
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}
async function getCategoriesAll() {
  await axiosClient({
    url: "/products/categories",
  })
    .then((res) => {
      searchInitValues.value.filter = res.data;
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}

//-------------------------------------------------------------------
//Lifecycle hooks

onMounted(() => {
  getProductsAll();
  getCategoriesAll();
});
//-------------------------------------------------------------------
</script>

<template v-if="productData">
  <h5>Поиск</h5>

  <div class="flex w-full search mb-10">
    <n-input
      v-model:value="searchModel.search"
      type="text"
      placeholder="Поиск по названию"
      size="large"
      @keyup.enter="search"
    />
    <n-button type="primary" size="large" @click="search()">Найти</n-button>
  </div>

  <h5>Фильтрация</h5>
  <n-checkbox-group
    @update:value="filter"
    v-model:value="searchModel.filter"
    class="mb-10"
  >
    <n-space>
      <n-grid :y-gap="8" :cols="5">
        <n-gi v-for="item in searchInitValues.filter" :key="item.id">
          <n-checkbox :value="item">{{ item }}</n-checkbox>
        </n-gi>
      </n-grid>
    </n-space>
  </n-checkbox-group>

  <h5>Сортировка</h5>
  <n-checkbox-group
    @update:value="sort"
    v-model:value="searchModel.sort"
    class="mb-10"
    :max="1"
  >
    <n-space>
      <n-grid :y-gap="8" :cols="5">
        <n-gi v-for="item in searchInitValues.sort" :key="item.id">
          <n-checkbox :value="item">{{ item }}</n-checkbox>
        </n-gi>
      </n-grid>
    </n-space>
  </n-checkbox-group>

  <div class="product">
    <p v-if="productData.length === 0">
      Ничего не найдено. Попробуйте поменять параметры поиска
    </p>
    <div class="product__wrapper">
      <productItem
        v-for="item in productData"
        :item="item"
        :key="item.id"
      ></productItem>
    </div>
  </div>
</template>

<style scoped>
.product__wrapper {
  display: grid;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  grid-template-columns: repeat(4, 22% [col-start]);
  grid-template-rows: 475px;
  column-gap: 30px;
  row-gap: 30px;
  justify-content: space-between;
}
</style>
