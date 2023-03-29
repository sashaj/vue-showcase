<script setup>
import { ref } from "vue";
import { NModal, NButton } from "naive-ui";

const showModal = ref(false);
</script>

<template>
  <n-button @click="showModal = true"> Start Me up </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>title</div>
    </template>
    <div>content</div>
    <template #action>
      <div>action</div>
    </template>
  </n-modal>
</template>
