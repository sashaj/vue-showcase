<script setup>
import { ref } from "vue";
import {
  NSpace,
  NButton,
  NDataTable,
  NIcon,
  NForm,
  NFormItemRow,
  NInput,
} from "naive-ui";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useValidateStore } from "@/stores/validateStore";

const router = useRouter();
const productStore = useProductStore();
const validateStore = useValidateStore();

//-------------------------------------------------------------------
//Data
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

const formRef = ref({});
const formModel = ref({
  name: null,
  address: null,
  phone: null,
  email: null,
});
const formRules = ref({
  email: {
    required: true,
    message: "Введите свою эл. почту",
    trigger: "blur",
    validator: validateStore.validateEmail,
  },
  name: {
    required: true,
    message: "Введите ФИО",
    trigger: "blur",
    validator: validateStore.validateEmail,
  },
  address: {
    required: true,
    message: "Введите адрес",
    trigger: "blur",
    validator: validateStore.validateEmail,
  },
  phone: {
    required: true,
    message: "Введите телефон",
    trigger: "blur",
    validator: validateStore.validateEmail,
  },
});

//-------------------------------------------------------------------
//Api functions

async function postBasket() {
  var data = [...productStore.basketData.products];
  await axiosClient({
    url: "some/test",
    method: "POST",
    data: data,
  }).then((res) => {
    console.log(res);
  });
}
//-------------------------------------------------------------------
//Logic functions

function handleBasketCheckout() {
  formRef.value?.validate((errors) => {
    if (errors) {
      window.$message.error("Заполните все поля!");
    } else {
      postBasket();
    }
  });
}

//-------------------------------------------------------------------
</script>

<template>
  <div>
    <h4>Оформление заказа</h4>
  </div>
  <n-space vertical :size="12">
    <n-data-table
      ref="dataTableRef"
      :columns="columns"
      :data="productStore.basketData.products"
    />
  </n-space>

  <n-form ref="formRef" @keyup.enter="" :model="formModel" :rules="formRules">
    <!--Files -->
    <h5>Заполните</h5>
    <n-form-item-row label="ФИО" path="name">
      <n-input v-model:value="formModel.name" placeholder="Введите данные" />
    </n-form-item-row>
    <n-form-item-row label="Адрес" path="address">
      <n-input v-model:value="formModel.address" placeholder="Введите Адрес"
    /></n-form-item-row>
    <n-form-item-row label="Телефон" path="phone">
      <n-input
        v-model:value="formModel.phone"
        :allow-input="validateStore.onlyAllowNumber"
        placeholder="Введите Телефон"
      />
    </n-form-item-row>
    <n-form-item-row label="Почта" path="email">
      <n-input v-model:value="formModel.email" placeholder="Введите Почта" />
    </n-form-item-row>

    <n-button type="primary" size="large" @click="handleBasketCheckout"
      >Оформить</n-button
    >
  </n-form>
</template>
