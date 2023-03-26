<script>
import { defineComponent, h, ref } from "vue";
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
          router.push("/auth");
        }
      },
    };
  },
});
</script>

<template>
  <header class="flex justify-center bg-sky-700 h-12">
    <div class="flex justify-between items-center w-full">
      <div class="px-4 text-white">Logo</div>
      <div class="px-4">
        <n-dropdown :options="options" class="w-48" @select="handleSelect">
          <n-button class="text-white">Иванов Иван Иванович</n-button>
        </n-dropdown>
      </div>
    </div>
  </header>
</template>
