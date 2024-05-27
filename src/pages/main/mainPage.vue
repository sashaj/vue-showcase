<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import productItem from "@/components/productItem.vue";
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
  NSpin,
  NAlert,
  NInputNumber,
  NForm,
  NFormItem,
} from "naive-ui";
import { useRouter, useRoute } from "vue-router";

const productStore = useProductStore();
const productData = ref([]);
const virginProductData = ref(null);
const searchModel = ref({ filter: null, search: null, sort: null });
const searchInitValues = ref({ filter: [], sort: ["По рейтингу", "По цене"] });
const loading = ref(true);
const productPostData = ref({});
const formRef = {};
const router = useRouter();
const uploadRef = ref(null);

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
  console.log(value);
  productData.value = [...virginProductData.value];
  if (value.length > 0) {
    productData.value = productData.value.filter((item) => {
      return value.some((val) => item.category === val.toLowerCase());
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

async function loadingOff() {
  await Promise.all([getProductsAll(), getCategoriesAll()]);
  loading.value = false;
}

//-------------------------------------------------------------------
//Api methods

async function getProductsAll() {
  //loading.value = true;
  await axiosClient({
    url: "/products",
  })
    .then((res) => {
      for (let i = 0; i < res.data.products.length; i++) {
        res.data.products[i].quantity = 1;
      }
      productData.value = [...res.data.products];
      virginProductData.value = [...res.data.products];
      loading.value = false;
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}
async function getCategoriesAll() {
  //loading.value = true;
  await axiosClient({
    url: "/products/categories",
  })
    .then((res) => {
      searchInitValues.value.filter = res.data;
      loading.value = false;
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
  loadingOff();
});
//-------------------------------------------------------------------
</script>

<template v-if="productData">
  <n-space vertical>
    <n-spin :show="loading">
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
          <n-grid :y-gap="8" cols="5" class="checkbox-grid">
            <n-gi v-for="item in searchInitValues.filter" :key="item.id">
              <n-checkbox :value="item.name">{{ item.name }}</n-checkbox>
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
          <n-grid :y-gap="8" :cols="2">
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
        <div class="product-grid">
          <productItem
            v-for="item in productData"
            :item="item"
            :key="item.id"
          ></productItem>
        </div>
      </div>
      <template #description> Загрузка... </template>
    </n-spin>
  </n-space>
</template>

<style scoped>
.product-grid {
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

@media screen and (max-width: 1550px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}
@media screen and (max-width: 800px) {
  .checkbox-grid {
    grid-template-columns: repeat(3, minmax(0px, 1fr)) !important;
  }
  .product-grid {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}
@media screen and (max-width: 600px) {
  .checkbox-grid {
    grid-template-columns: repeat(2, minmax(0px, 1fr)) !important;
  }
  .product-grid {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}
</style>
