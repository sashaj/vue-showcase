<script>
import { h, defineComponent, ref, onMounted } from "vue";
import {
  DocumentOutline,
  CaretDownOutline,
  HomeOutline,
  AddCircleOutline,
  GridOutline,
} from "@vicons/ionicons5";
import { NLayoutSider, NMenu, NIcon } from "naive-ui";
import { RouterLink, useRoute, useRouter } from "vue-router";
import LFooter from "@/layouts/l-footer.vue";
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export default defineComponent({
  components: {
    NLayoutSider,
    NMenu,
    NIcon,
    LFooter,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const selectedKey = ref(null);
    onMounted(async () => {
      await router.isReady();
      selectedKey.value = route.name;
    });
    const menuOptions = ref([
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "main",
              },
            },
            { default: () => "Главная страница" }
          ),
        key: "home",
        icon: renderIcon(HomeOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "form",
              },
            },
            { default: () => "Форма создания" }
          ),
        key: "form",
        icon: renderIcon(AddCircleOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "table",
              },
            },
            { default: () => "Таблица данных" }
          ),
        key: "table",
        icon: renderIcon(GridOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "about",
              },
            },
            { default: () => "О нас" }
          ),
        key: "about",
        icon: renderIcon(DocumentOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "pinia",
              },
            },
            { default: () => "Pinia Пример" }
          ),
        key: "pinia",
        icon: renderIcon(DocumentOutline),
      },
    ]);
    return {
      selectedKey,
      menuOptions,
      collapsed: ref(false),
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) });
      },
    };
  },
});
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed="collapsed"
    :collapsed-width="64"
    :width="288"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="flex h-full flex-col justify-between">
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :expand-icon="expandIcon"
        v-model:value="selectedKey"
      />
      <LFooter v-if="!collapsed"></LFooter>
    </div>
  </n-layout-sider>
</template>
