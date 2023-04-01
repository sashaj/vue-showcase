<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import {
  NInput,
  NInputNumber,
  NButton,
  NSpace,
  NForm,
  NFormItem,
  NModal,
} from "naive-ui";
const authStore = useAuthStore();
const router = useRouter();
const productData = ref(null);
const productEditData = ref(null);
const showModal = ref(false);
const modalStyle = {
  width: "50%",
  minWidth: "1000px",
  overflowY: "auto",
  minHeight: "420px",
};
const formRef = {};

//-------------------------------------------------------------------
//Api methods

async function getProduct() {
  await axiosClient({
    url: `/products/${router.currentRoute._value.params.id}`,
  })
    .then((res) => {
      productData.value = { ...res.data };
      productEditData.value = { ...res.data };
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}
async function putProduct() {
  const data = {};
  await axiosClient({
    url: `/products/${router.currentRoute._value.params.id}`,
    method: "PUT",
  })
    .then((res) => {
      productData.value = { ...res.data };
      productEditData.value = { ...res.data };
      showModal.value = false;
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}

async function deleteProduct() {
  await axiosClient({
    url: `/products/${router.currentRoute._value.params.id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      window.$message.error(error.message);
    });
}

//-------------------------------------------------------------------
//Lifecycle hooks

onMounted(() => {
  getProduct();
});

//-------------------------------------------------------------------
</script>

<template>
  <div class="product" v-if="productData">
    <n-space v-if="authStore.currentUserAuthData">
      <n-button type="primary" size="large" @click="showModal = true"
        >Редактировать продукт</n-button
      >
      <n-button type="warning" size="large" @click="deleteProduct"
        >Удалить</n-button
      >
    </n-space>

    <h4>
      {{ productData.title }}
    </h4>
    <div class="img__wrapper">
      <img :src="productData.images[0]" alt="" />
    </div>
    <p>Описание: {{ productData.description }}</p>
    <p>Цена: {{ productData.price }}</p>
    <p>Бренд: {{ productData.brand }}</p>
  </div>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :bordered="false"
    size="huge"
    :style="modalStyle"
    title="Информация по направлению"
  >
    <n-form ref="formRef">
      <n-form-item label="Описание">
        <n-input
          v-model:value="productEditData.description"
          placeholder="Описание"
        />
      </n-form-item>
      <n-form-item label="Цена">
        <n-input-number
          v-model:value="productEditData.price"
          placeholder="Цена"
        />
      </n-form-item>
      <n-form-item label="Бренд">
        <n-input v-model:value="productEditData.brand" placeholder="Бренд" />
      </n-form-item>
      <n-form-item label="Скидка">
        <n-input-number
          v-model:value="productEditData.discountPercentage"
          placeholder="Скидка"
        />
      </n-form-item>
      <n-form-item>
        <n-button @click="putProduct"> Редактировать </n-button>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped></style>
