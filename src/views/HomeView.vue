<template>
  <div class="bg-blue-200 min-h-screen flex flex-col items-center justify-center">
    <div class="p-6 rounded-lg shadow-lg bg-white">
      <div class="flex flex-col md:flex-row">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
</script>

<style scoped></style>
