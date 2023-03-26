<script>
import LHeader from "@/layouts/l-header.vue";
import LFooter from "@/layouts/l-footer.vue";
import LAside from "@/layouts/l-aside.vue";
import { defineComponent } from "vue";
import { NLayout, useLoadingBar, useMessage, NScrollbar } from "naive-ui";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: {
    LHeader,
    LFooter,
    LAside,
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
  <div v-if="currentUserAuthData" class="flex flex-col grow shrink h-full">
    <LHeader></LHeader>
    <main class="flex h-full grow">
      <n-layout has-sider class="min-h-full">
        <LAside></LAside>
        <n-layout>
          <n-scrollbar style="max-height: calc(100vh - 64px)">
            <div class="container p-4">
              <RouterView></RouterView>
            </div>
          </n-scrollbar>
        </n-layout>
      </n-layout>
    </main>
  </div>
  <div v-else class="flex flex-col grow shrink h-full">
    <RouterView></RouterView>
  </div>
</template>
