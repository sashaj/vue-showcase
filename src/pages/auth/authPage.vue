<script setup>
import { NForm, NFormItemRow, NInput, NButton } from "naive-ui";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useValidateStore } from "@/stores/authStore";
const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;

const formRef = ref(null);
const route = useRoute();
const router = useRouter();
const loadingRef = ref(false);
const authStore = useAuthStore();
const validateStore = useValidateStore();
const formValue = ref({
  user: {
    login: "atuny0",
    password: "9uQFF1Lh",
  },
});

const rules = ref({
  user: {
    login: {
      required: true,
      message: "Введите свой Логин",
      trigger: "blur",
    },
    password: {
      required: true,
      message: "Введите свой Пароль",
      trigger: "blur",
    },
  },
});

function getData() {
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      username: formRef.value.model.user.login,
      password: formRef.value.model.user.password,
      // expiresInMins: 60, // optional
    }),
  })
    .then((res) => res.json())
    .then(console.log);
}

function handleValidateClick(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      loadingRef.value = true;
      if (!authStore.API_URL) {
        authStore.getApiURL();
      }
      authStore
        .login(
          formRef.value.model.user.login,
          formRef.value.model.user.password
        )
        .then(
          () => {
            if (authStore.currentUserAuthData) {
              window.$message.success("Вы успешно авторизовались!");
              router.push(route.query.returnUrl ? route.query.returnUrl : "/");
            }
          },
          (error) => {
            window.$message.error(error);
          }
        )
        .finally(() => {
          loadingRef.value = false;
        });
    } else {
      window.$message.error("Заполните все поля!");
    }
  });
}
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <div class="container max-w-lg">
      <h1 class="text-2xl text-center mb-8">
        {{ PROJECT_NAME }}
      </h1>
      <n-form
        ref="formRef"
        @keyup.enter="handleValidateClick"
        :model="formValue"
        :rules="rules"
      >
        <n-form-item-row label="Логин" path="user.login">
          <n-input
            v-model:value="formValue.user.login"
            placeholder="Введите свой Логин"
          />
        </n-form-item-row>
        <n-form-item-row label="Пароль" path="user.password">
          <n-input
            v-model:value="formValue.user.password"
            type="password"
            placeholder="Введите свой Пароль"
          />
        </n-form-item-row>
      </n-form>
      <n-button
        :loading="loading"
        icon-placement="left"
        @click="handleValidateClick"
        type="primary"
        class="bg-green-100 border-green-200 hover:border-green-600 p-5"
        block
        secondary
        strong
      >
        Авторизоваться
      </n-button>
      <n-button
        :loading="loading"
        icon-placement="left"
        @click="getData"
        type="primary"
        class="bg-green-100 border-green-200 hover:border-green-600 p-5"
        block
        secondary
        strong
      >
        Fetch
      </n-button>
    </div>
  </div>
</template>
