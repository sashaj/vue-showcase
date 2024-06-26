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
      window.$message.success(`${item.title} добавлен!`);
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
    deleteBasketItem(product) {
      this.basketData.labelCount =
        this.basketData.labelCount - product.quantity;
      this.basketData.products = this.basketData.products.filter(
        (item) => item.id !== product.id
      );
      this.saveBasketToLocalStorage();
    },
  },
});
