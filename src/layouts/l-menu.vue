<script>
import { defineComponent, h, ref } from "vue";
import { NIcon, NMenu } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  NewspaperOutline,
  Heart,
} from "@vicons/ionicons5";
import { RouterLink, useRoute, useRouter } from "vue-router";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "main",
          },
        },
        { default: () => "Главная" }
      ),
    key: "home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "news",
          },
        },
        { default: () => "Новости" }
      ),
    key: "news",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "main",
          },
        },
        { default: () => "Все заявки" }
      ),
    key: "home",
  },

  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "faq",
          },
        },
        { default: () => "Вопросы" }
      ),
    key: "faq",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "contacts",
          },
        },
        { default: () => "Контакты" }
      ),
    key: "contacts",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "documents",
          },
        },
        { default: () => "Документы" }
      ),
    key: "documents",
  },
];

export default defineComponent({
  components: { NMenu },
  setup() {
    return {
      activeKey: ref(null),
      menuOptions,
    };
  },
});
</script>
<template>
  <n-menu
    v-model:value="activeKey"
    mode="horizontal"
    :options="menuOptions"
    class="justify-between px-2"
  />
</template>

<style>
.n-menu.n-menu--horizontal .n-menu-item:first-child .n-menu-item-content {
  padding-left: 0;
}
.n-menu.n-menu--horizontal .n-menu-item:last-child .n-menu-item-content {
  padding-right: 0;
}
</style>
