<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { NCard, NInput, NButton } from "naive-ui";
import { useRouter, useRoute } from "vue-router";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getCurrentUrl();
  getData();
});

function getCurrentUrl() {
  console.log("r", router.currentRoute.value.name);
}

async function getData() {
  await axiosClient({
    url: "/products",
  }).then((res) => {
    productStore.productData = res.data.products;
    console.log(productStore.productData);
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
</script>

<template>
  <div class="product">
    <div class="product__wrapper">
      <router-link
        v-for="item in productStore.productData"
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
