<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
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
const router = useRouter();
const route = useRoute();
const productData = ref({});
const virginProductData = ref({});
const searchModel = ref({ filter: null, search: "", sort: null });
const searchInitValues = ref({ filter: [], sort: ["По рейтингу", "По цене"] });
const categories = ref({});

//-------------------------------------------------------------------
//Logic methods

function getCurrentUrl() {
  // console.log("r", router.currentRoute.value.name);
}

function search() {
  productData.value = virginProductData.value;
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
  productData.value = virginProductData.value;
  if (value.length > 0) {
    productData.value = productData.value.filter((item) => {
      return item.category === value[0];
    });
  }
}

function sort(value) {
  productData.value = virginProductData.value;
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
  }).then((res) => {
    productData.value = res.data.products;
    virginProductData.value = res.data.products;
    console.log(productData);
  });
}
async function getCategoriesAll() {
  await axiosClient({
    url: "/products/categories",
  }).then((res) => {
    console.log(searchInitValues.value);
    searchInitValues.value.filter = res.data;
  });
}

async function getData() {
  await axiosClient({
    url: "/products",
  }).then((res) => {
    productData.value = res.data.products;
    virginProductData.value = res.data.products;
    console.log(productData);
  });
}

async function postData() {
  var data = {
    id: 1,
    name: "test",
  };
  await axiosClient({
    url: "some/test",
    method: "POST",
    data: data,
  }).then((res) => {
    console.log(res);
  });
}

//-------------------------------------------------------------------
//Lifecycle hooks

onMounted(() => {
  // getCurrentUrl();
  getProductsAll();
  getCategoriesAll();
});
//-------------------------------------------------------------------
</script>

<template>
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
        <n-gi v-for="item in searchInitValues.filter">
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
        <n-gi v-for="item in searchInitValues.sort">
          <n-checkbox :value="item">{{ item }}</n-checkbox>
        </n-gi>
      </n-grid>
    </n-space>
  </n-checkbox-group>

  <div class="product">
    <div class="product__wrapper">
      <router-link
        v-for="item in productData"
        class="product__item"
        :to="{ name: 'productItem', params: { id: item.id } }"
      >
        <n-card hoverable>
          <template #cover>
            <div class="product-list__image">
              <img :src="item.thumbnail" />
            </div>
          </template>
          <div class="flex justify-between">
            <p>{{ item.title }}</p>
            <p>${{ item.price }}</p>
          </div>
          <n-rate size="small" readonly :value="item.rating" allow-half />
          <p class="text-slate-400">{{ item.description }}</p>
        </n-card>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.product__item {
  width: 100%;
  margin-right: 30px;
  margin-bottom: 30px;
}
.product-list__image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.product-list__image img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.n-card {
  max-width: 100%;
  height: 100%;
}

.product__wrapper {
  display: grid;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  grid-template-columns: repeat(4, 22% [col-start]);
  column-gap: 30px;
  justify-content: space-between;
}
</style>
