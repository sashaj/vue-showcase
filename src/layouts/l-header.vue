<script>
import { defineComponent, h, ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { NIcon, NDropdown, NButton } from "naive-ui";
import { LogOutOutline } from "@vicons/ionicons5";

import { useAuthStore } from "@/stores/authStore";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export default defineComponent({
  components: { NDropdown, NButton },
  setup() {
    const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;
    const router = useRouter();
    const authStore = useAuthStore();
    const currentUser = ref(null);
    const loggedIn = computed(() => {
      return currentUser;
    });

    return {
      PROJECT_NAME,
      authStore,
      currentUser,
      router,
      loggedIn,
      options: [
        {
          label: "Выйти",
          key: "logout",
          icon: renderIcon(LogOutOutline),
        },
      ],
      handleSelect(key) {
        if (key === "logout") {
          window.$message.info("Вы успешно вышли!");
          authStore.logout();
          currentUser.value = null;
          router.push("/auth");
        }
      },
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.router);
    }
  },
});
</script>

<template>
  <header class="flex justify-center bg-sky-700 h-12">
    <div class="flex justify-between items-center w-full p-3">
      <router-link :to="{ name: 'main' }">
        <div class="px-4 text-white">Logo</div>
      </router-link>
      <div class="px-4" v-if="loggedIn.value">
        <n-dropdown :options="options" class="w-48" @select="handleSelect">
          <n-button class="text-white"> {{ loggedIn.value.name }} </n-button>
        </n-dropdown>
      </div>
      <router-link
        v-if="!loggedIn && this.router.currentRoute._value.path !== '/auth'"
        :to="{ name: 'auth' }"
      >
        <n-button class="text-white">Войти</n-button>
      </router-link>
    </div>
  </header>
</template>
