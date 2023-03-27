import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productData: [],
  }),
  getters: {},
  actions: {},
});
