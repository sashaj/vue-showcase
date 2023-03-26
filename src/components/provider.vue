<script>
import { defineComponent } from "vue";
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  ruRU,
  dateRuRU,
} from "naive-ui";
import App from "../App.vue";

export default defineComponent({
  name: "Provider",
  components: {
    App,
    NConfigProvider,
    NMessageProvider,
    NDialogProvider,
    NNotificationProvider,
    NLoadingBarProvider,
  },

  setup() {
    return {
      ruRU,
      dateRuRU,
    };
  },
});
</script>

<template>
  <n-config-provider
    class="flex flex-col grow shrink h-full"
    :locale="ruRU"
    :date-locale="dateRuRU"
  >
    <n-dialog-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-loading-bar-provider
            :loadingBarStyle="{ loading: { background: '#fff' } }"
          >
            <App />
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
