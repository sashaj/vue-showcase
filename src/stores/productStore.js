import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productData: [],
    virginProductData: [],
    basketData: {
      products: null,
      count: 0,
    },
  }),
  getters: {},
  actions: {
    addToBasket(item) {
      this.basketData.products.push(item);
      this.basketData.count++;
      console.log(this.basketData);
      this.saveBasketToLocalStorage();
    },
    saveBasketToLocalStorage() {
      localStorage.setItem("basketData", JSON.stringify(this.basketData));
    },
    getBasketFromLocalStorage() {
      if (localStorage.getItem("basketData")) {
        this.basketData = JSON.parse(localStorage.getItem("basketData"));
      }
    },
  },
});
