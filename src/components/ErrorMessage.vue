<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <div>
      <img alt="Error" class="logo" src="@/assets/error.svg" width="250" height="250" />
    </div>
    <p class="text-red-500 text-lg my-8 mx-auto text-center">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
