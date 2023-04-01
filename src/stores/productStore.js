import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    productData: [],
    virginProductData: [],
    basketData: {
      products: [],
      labelCount: 0,
    },
  }),
  getters: {},
  actions: {
    addToBasket(item) {
      let found = this.basketData.products.findIndex((el) => el.id === item.id);
      if (found >= 0) {
        this.basketData.products[found].quantity++;
      } else {
        this.basketData.products.push(item);
      }
      this.basketData.labelCount++;

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
