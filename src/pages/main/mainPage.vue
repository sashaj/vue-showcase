<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { NCard, NInput, NButton, NRate, NSpace } from "naive-ui";
import { useRouter, useRoute } from "vue-router";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
const productData = ref({});
const virginProductData = ref({});
const searchConfig = ref({ filter: null, search: "", sort: null });
const categories = ref({});
//Logic methods
//___________________________________________________________________________

function getCurrentUrl() {
  // console.log("r", router.currentRoute.value.name);
}

function search() {
  productData.value = virginProductData.value;
  productData.value = productData.value.filter((item) => {
    if (searchConfig.value.search && item.title) {
      return item.title
        .toLowerCase()
        .includes(searchConfig.value.search.toLowerCase());
    }
    return item;
  });
}

//Api methods
//___________________________________________________________________________
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
    categories.value = res.data;
    console.log(categories.value);
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

//Lifecycle hooks
//___________________________________________________________________________
onMounted(() => {
  // getCurrentUrl();
  getProductsAll();
  getCategoriesAll();
});
</script>

<template>
  <div class="flex w-full search mb-10">
    <n-input
      v-model:value="searchConfig.search"
      type="text"
      placeholder="Поиск по названию"
      size="large"
      @keyup.enter="search"
    />
    <n-button type="primary" size="large" @click="search()">Найти</n-button>
  </div>
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
  padding-left: 24px;
  padding-right: 24px;
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
