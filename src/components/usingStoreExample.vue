<script>
import { useExampleStore } from "../stores/piniaExampleStore";
import { axiosInstance } from "@/_helpers/api";
export default {
  setup() {
    const exampleStore = useExampleStore();
    return { exampleStore };
  },
  methods: {
    async test() {
      const response = await axiosInstance.get();
    },
  },
  mounted() {
    this.test();
  },
};
</script>

<template>
  <div class="task">
    <h3>All tasks</h3>
    <p>on task click, fav is toggled123333</p>
    <p
      @click="exampleStore.toggleFav(task.id)"
      v-for="task in exampleStore.tasks"
    >
      {{ task.title }}
    </p>
    <h3>Favorite tasks</h3>
    <p v-for="task in exampleStore.favs">{{ task.title }}</p>
  </div>
</template>
