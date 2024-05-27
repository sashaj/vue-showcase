<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { NCard, NButton, NRate } from "naive-ui";

const props = defineProps(["item"]);
const productStore = useProductStore();
</script>

<template>
  <n-card hoverable :key="item.id" class="product__item">
    <router-link
      class="pb-10"
      :to="{ name: 'productItem', params: { id: item.id } }"
    >
      <div class="product-list__image">
        <img :src="item.thumbnail" loading="lazy" width="100" height="100" />
      </div>

      <div class="flex justify-between">
        <p>{{ item.title }}</p>
        <p class="whitespace-nowrap text-blue-600">${{ item.price }}</p>
      </div>
      <n-rate size="small" readonly :value="item.rating" allow-half />
      <p class="text-slate-400 product-description my-5">
        {{ item.description }}
      </p>
    </router-link>
    <n-button
      @click="productStore.addToBasket(item)"
      class="product-add-to-basket"
      >Добавить в корзину
    </n-button>
  </n-card>
</template>

<style scoped>
.product__item {
  width: 100%;
  height: 100%;
  display: block;
  padding: 0;
}

.product-description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}

@media screen and (max-width: 1200px) {
  .product-description {
    overflow: hidden;
    display: -webkit-box;
  }
}

.product-add-to-basket {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
}

@media screen and (max-width: 1024px) {
  .product-add-to-basket {
    bottom: 10px;
  }
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
</style>
