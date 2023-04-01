<script>
import { defineComponent, h, ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { NIcon, NDropdown, NButton, NBadge, NAvatar } from "naive-ui";
import {
  LogOutOutline,
  BasketOutline,
  PersonCircleOutline,
} from "@vicons/ionicons5";

import { useAuthStore } from "@/stores/authStore";
import { useProductStore } from "@/stores/productStore";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export default defineComponent({
  components: {
    NDropdown,
    NButton,
    NBadge,
    NAvatar,
    NIcon,
    BasketOutline,
    PersonCircleOutline,
  },
  setup() {
    const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;
    const router = useRouter();
    const authStore = useAuthStore();
    const productStore = useProductStore();
    const badge = ref({ value: 0 });
    onMounted(() => {
      productStore.getBasketFromLocalStorage();
    });
    return {
      PROJECT_NAME,
      authStore,
      productStore,
      router,
      badge,
      options: [
        {
          label: "Профиль",
          key: "profile",
          icon: renderIcon(PersonCircleOutline),
        },
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
        if (key === "profile") {
          router.push("/profile");
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
        <div class="px-4 text-white">Logo/Home</div>
      </router-link>
      <div class="px-4" v-if="authStore.currentUserAuthData">
        <n-dropdown :options="options" class="w-48" @select="handleSelect">
          <n-button class="text-white">
            {{ authStore.currentUserAuthData.username }}
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

      <router-link
        v-if="router.currentRoute.value.path !== '/auth'"
        :to="{ name: 'basket' }"
      >
        <n-badge :value="productStore.basketData.labelCount">
          <n-icon :size="25" color="#ffffff">
            <basket-outline />
          </n-icon>
        </n-badge>
      </router-link>
    </div>
  </header>
</template>
