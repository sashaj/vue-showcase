<script setup>
import { defineComponent, ref } from "vue";
import { NModal, NSpace } from "naive-ui";
import { useServiceStore } from "@/stores/serviceStore";
const serviceStore = useServiceStore();

const props = defineProps({
  title: String,
});
const modalShow = ref(true);
const modalStyle = {
  width: "50%",
  minWidth: "1000px",
  overflowY: "auto",
  minHeight: "420px",
};
</script>

<template>
  <n-modal
    v-model:show="serviceStore.modalShow"
    id="modal"
    preset="card"
    :bordered="false"
    size="huge"
    :style="modalStyle"
    :title="title"
  >
    <slot></slot>
  </n-modal>
</template>

<style lang="scss" scoped></style>
