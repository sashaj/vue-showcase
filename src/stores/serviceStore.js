import { defineStore } from "pinia";

export const useServiceStore = defineStore("serviceStore", {
  state: () => ({
    modalShow: false,
  }),
  getters: {},
  actions: {
    toggleModal() {
      this.modalShow != this.modalShow;
    },
    modalOn() {
      this.modalShow = true;
    },
    modalOff() {
      this.modalShow = false;
    },
  },
});
