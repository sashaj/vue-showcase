<script setup>
import { ref } from "vue";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getNewsArticle();
});

async function getData() {
  await axiosClient({
    url: "/map_change/api/v1/get_names",
  }).then((res) => {
    console.log(res);
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

function getNewsArticle() {
  console.log("r", router.currentRoute._value.params.id);
}
</script>

<template>
  <div class="product"></div>
</template>

<style scoped></style>
