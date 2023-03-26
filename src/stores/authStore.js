import { defineStore } from "pinia";
import { axiosClient } from "@/_helpers/api";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    API_URL: null,
    currentUserAuthData: null,
  }),
  getters: {},
  actions: {
    async login(username, password) {
      var data = {
        username,
        password,
      };
      await axiosClient({
        url: "/map_change/auth/token/login/",
        method: "POST",
        data: data,
      })
        .then((user) => {
          const userObject = {
            name: null,
            token: user.data.auth_token,
          };
          localStorage.setItem("currentUser", JSON.stringify(userObject));
          this.currentUserAuthData = JSON.stringify(userObject);
          return user;
        })
        .catch((error) => {
          window.$message.error(error.message);
        });
    },

    getApiURL() {
      this.API_URL = import.meta.env.VITE_API_URL;
    },

    getCurrentUser() {
      this.currentUserAuthData = JSON.parse(
        localStorage.getItem("currentUser")
      );
    },
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");
      this.currentUserAuthData = null;
    },
  },
});
