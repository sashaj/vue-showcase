<script setup>
import { usePiniaExampleStore } from "../../stores/piniaExampleStore";
import { axiosClient } from "@/_helpers/api";
import { onMounted } from "vue";

const piniaExampleStore = usePiniaExampleStore();

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

onMounted(() => {
  //postData();
});
</script>

<template>
  <div class="task">
    <h4>This is a Pinia example</h4>
    <p>Click on task to add/remove from favorites</p>
    <p>Also this component contains requests examples</p>
    <h5>All Todo Tasks</h5>
    <p
      @click="piniaExampleStore.toggleFav(task.id)"
      v-for="task in piniaExampleStore.tasks"
    >
      {{ task.title }}
    </p>
    <h5>Favorite tasks</h5>

    <p
      @click="piniaExampleStore.toggleFav(task.id)"
      v-for="task in piniaExampleStore.favs"
    >
      {{ task.title }}
    </p>
  </div>
</template>
