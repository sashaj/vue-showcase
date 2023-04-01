<script setup>
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

//-------------------------------------------------------------------
//Data

//-------------------------------------------------------------------
//Api functions

async function postBasket() {
  var data = [...productStore.basketData.products];
  await axiosClient({
    url: "some/test",
    method: "POST",
    data: data,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      window.$message.error(error.message);
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
    <h4>Профиль</h4>
    <div v-for="(value, key) in authStore.currentUserAuthData">
      <p v-if="key !== 'token'">{{ key }}: {{ value }}</p>
    </div>
  </div>
</template>
