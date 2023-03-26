<script setup>
const version = __APP_VERSION__ || false;
</script>

<template>
  <footer
    class="border-solid border-gray-200 border-0 border-t py-10 px-4 mt-auto bg-stone-800"
  >
    <div class="flex justify-center max-w-screen-2xl mx-auto">
      <p>footer</p>
    </div>
  </footer>
</template>

<style scoped>
footer a,
footer p {
  color: white;
  margin-top: 0;
  font-weight: 400;
  margin-bottom: 15px;
}
footer p {
  color: #878b90;
}
</style>
