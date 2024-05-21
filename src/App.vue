<script>
import LHeader from "@/layouts/l-header.vue";
import LMenu from "@/layouts/l-menu.vue";
import LFooter from "@/layouts/l-footer.vue";

import { defineComponent } from "vue";
import { NLayout, useLoadingBar, useMessage, NScrollbar } from "naive-ui";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    LHeader,
    LFooter,
    NLayout,
    NScrollbar,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  computed: {
    // isAdmin() {
    //   return this.currentUser && this.currentUser.role === Role.Admin;
    // }
  },

  methods: {
    logout() {
      useAuthStore.logout();
      router.push("/auth");
    },
  },
  setup() {
    window.$loadingBar = useLoadingBar();
    window.$message = useMessage();
    // window.$loadingBar.start()
    const authStore = useAuthStore();
    const { currentUserAuthData } = storeToRefs(authStore);
    return { authStore, currentUserAuthData };
  },
});
</script>

<template>
  <!-- <div v-if="currentUserAuthData" class="flex flex-col grow shrink h-full"> -->
  <div class="flex flex-col grow shrink h-full">
    <LHeader></LHeader>
    <main class="flex h-full grow max-w-screen-2xl mx-auto w-full">
      <n-layout has-sider class="min-h-full">
        <n-layout>
          <div class="container px-4 py-10 mx-auto">
            <RouterView></RouterView>
          </div>
        </n-layout>
      </n-layout>
    </main>
    <LFooter></LFooter>
  </div>

  <!-- <div v-else class="flex flex-col grow shrink h-full">
    <RouterView></RouterView>
  </div> -->
</template>
