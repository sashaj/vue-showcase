<script setup>
import { NResult, NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();

function goHomePage() {
  router.push("/");
}
</script>

<template>
  <div class="flex h-screen justify-center items-center">
    <n-result
      status="404"
      title="404 страница не найдена!"
      description="Вы можете вернуться на главную страницу"
    >
      <template #footer>
        <n-button @click="goHomePage">Главная страница</n-button>
      </template>
    </n-result>
  </div>
</template>
