<template>
  <div class="bg-blue-200 min-h-screen flex flex-col items-center justify-center">
    <div class="p-6 rounded-lg shadow-lg bg-white">
      <div class="flex flex-col md:flex-row">
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
      </div>

      <div>
        <div v-if="weather.name">
          <h1 class="text-2xl font-semibold">{{ weather?.name }}</h1>
          <div class="flex items-center mt-2">
            <button
              @click="toggleTemperatureUnit"
              class="px-2 py-1 bg-blue-500 text-white rounded-lg"
            >
              {{ temperatureUnit }}
            </button>
            <p class="text-4xl font-semibold ml-4">
              {{ weather?.main?.temp }}°{{ temperatureUnit }}
            </p>
          </div>
          <img
            :src="getWeatherIconUrl(weather?.weather?.[0]?.icon)"
            :alt="weather?.weather?.[0]?.main"
            class="mt-4"
          />
          <p class="mt-2">{{ weather?.weather?.[0]?.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const city = ref('')
const weather = ref({})
const temperatureUnit = ref('C')

const searchWeather = async () => {
  if (!city.value) return
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/data/2.5/weather?q=${city.value}&units=${
        temperatureUnit.value === 'C' ? 'metric' : 'imperial'
      }&appid=${import.meta.env.VITE_APP_API_KEY}`
    )
    weather.value = response.data
  } catch (error: any) {
    console.error(error)
  }
}

const toggleTemperatureUnit = () => {
  temperatureUnit.value = temperatureUnit.value === 'C' ? 'F' : 'C'
  if (city.value) searchWeather()
}

const getWeatherIconUrl = (icon: any) => {
  return `${import.meta.env.VITE_APP_BASE_URL}/img/w/${icon}.png`
}
</script>

<style scoped></style>
