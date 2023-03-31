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

    return {
      PROJECT_NAME,
      authStore,
      router,
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
          authStore.currentUserAuthData = null;
          router.push("/");
        }
      },
    };
  },
});
</script>

<template>
  <header class="flex justify-center bg-sky-700 h-12">
    <div class="flex justify-between items-center w-full p-3">
      <router-link :to="{ name: 'main' }">
        <div class="px-4 text-white">Logo</div>
      </router-link>
      <div class="px-4" v-if="authStore.currentUserAuthData">
        <n-dropdown :options="options" class="w-48" @select="handleSelect">
          <n-button class="text-white">
            {{ authStore.currentUserAuthData.name }}
          </n-button>
        </n-dropdown>
      </div>
      <router-link
        v-if="
          !authStore.currentUserAuthData &&
          router.currentRoute.value.path !== '/auth'
        "
        :to="{ name: 'auth' }"
      >
        <n-button class="text-white">Войти</n-button>
      </router-link>
    </div>
  </header>
</template>
