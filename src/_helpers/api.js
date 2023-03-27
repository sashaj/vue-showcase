import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const axiosClient = axios.create({
  baseURL: `https://${apiURL}`,
  timeout: 4000,
  headers: { "Content-Type": "application/json" },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const authStore = useAuthStore();
    config.headers.Accept = "*/*";
    // const currentUser = authStore.currentUserAuthData || {};
    // config.headers.Authorization = currentUser.token
    //   ? `Token ${currentUser.token}`
    //   : {};

    if (!authStore.API_URL) {
      authStore.getApiURL();
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx (ok reqs) cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if ([401, 403].indexOf(error.status) !== -1) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      const authStore = useAuthStore();
      authStore.logout();
      //location.reload(true);
    }
    // const error = (data && data.non_field_errors[0]) || response.statusText;
    return Promise.reject(error);
  }
);
