<template>
  <input
    v-model="city"
    type="text"
    placeholder="Enter city name"
    class="px-4 py-2 border rounded-lg w-full md:mr-2"
  />
  <button
    @click="searchWeather"
    class="px-4 py-2 bg-blue-500 text-white rounded-lg w-full md:w-auto mt-2 md:mt-0"
  >
    Search
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const city = ref('')

const searchWeather = async () => {
  try {
    if (!city.value) return;

    router.push({
      name: 'dashboard',
      query: { city: city.value }
    })
  } catch (error: any) {
    console.error(error)
  }
}
</script>

<style scoped></style>
