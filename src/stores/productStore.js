import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productData: [],
    virginProductData: [],
  }),
  getters: {},
  actions: {},
});
