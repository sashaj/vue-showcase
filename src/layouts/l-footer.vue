<script setup>
const version = __APP_VERSION__ || false;
</script>

<template>
  <footer
    class="border-solid border-gray-200 border-0 border-t flex justify-center py-2 px-4 mt-auto"
  >
    <div>
      <a href="https://rcitsakha.ru/">test</a
      >{{ version ? ` v.${version}` : "" }}
    </div>
  </footer>
</template>
