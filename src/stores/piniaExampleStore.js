import { defineStore } from "pinia";

export const usePiniaExampleStore = defineStore("PiniaExampleStore", {
  //state is like data()
  state: () => ({
    tasks: [
      {
        title: "Task 1",
        isFav: false,
        id: 446775,
      },
      {
        title: "Task 2",
        isFav: false,
        id: 22247,
      },
      {
        title: "Task 3",
        isFav: false,
        id: 786905,
      },
      {
        title: "Task 4",
        isFav: false,
        id: 888151,
      },
      {
        title: "Task 5",
        isFav: false,
        id: 888153,
      },
    ],
  }),
  //getters are like computed:
  getters: {
    favs() {
      let filtered = this.tasks.filter((t) => t.isFav);
      // return `${filtered} + isFav: ${this.tasks.isFav}`;
      return filtered;
    },
  },
  //actions are like methods
  actions: {
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },
  },
});
