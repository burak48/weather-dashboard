<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center"
    :class="weatherBackgroundClass"
  >
    <div class="p-6 rounded-lg shadow-lg bg-white">
      <ErrorMessage v-if="isError" :message="errorMessage" />
      <div v-if="!isError">
        <div v-if="loading" class="flex justify-center items-center">
          <LoadingSpinner />
        </div>
        <div v-else>
          <div v-if="weather.city" class="flex flex-col justify-center items-center mt-4">
            <h1 class="text-2xl font-semibold">{{ weather?.city }}</h1>
            <div class="flex items-center mt-2">
              <button
                @click="toggleTemperatureUnit"
                class="px-2 py-1 bg-blue-500 text-white rounded-lg"
              >
                {{ temperatureUnit }}
              </button>
              <p class="text-4xl font-semibold ml-4">
                {{ Math.ceil(weather?.main?.temp) }}°{{ temperatureUnit }}
              </p>
            </div>
            <img
              :src="getWeatherIconUrl(weather?.weather?.[0]?.icon)"
              :alt="weather?.weather?.[0]?.main"
              class="mt-4"
              width="64"
              height="64"
            />
            <p class="mt-2">{{ weather?.weather?.[0]?.description }}</p>
          </div>

          <div v-if="forecastData.length > 0" class="mt-4">
            <h2 class="text-xl font-semibold text-center md:text-start">3-Day Forecast</h2>
            <div class="h-48 overflow-y-auto">
              <div class="flex flex-col md:flex-row justify-center mt-4">
                <div
                  v-for="(day, index) in forecastData"
                  :key="index"
                  class="p-4 text-center flex flex-col justify-center items-center border-solid border-2 border-black mb-1 md:mr-1"
                >
                  <!-- <p>{{ new Date(day.dt * 1000).toDateString() }}</p> -->
                  <p>{{ formatDate(day.dt_txt) }}</p>
                  <img
                    :src="getWeatherIconUrl(day.weather[0].icon)"
                    :alt="day.weather[0].main"
                    width="48"
                    height="48"
                  />
                  <p>{{ day.weather[0].description }}</p>
                  <p>{{ Math.ceil(day.main.temp) }}°{{ temperatureUnit }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="!loading"
        @click="goToSearch"
        class="flex justify-center items-center w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Search for new city
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getFourDaysWeather, getWeatherIconUrl } from '@/api/index'

const router = useRouter()
const { city } = defineProps(['city'])

const loading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const temperatureUnit = ref('C')
const weather: any = ref({})

type Forecast = {
  dt: any
  dt_txt: string
  weather: [
    {
      id: number
      icon: string
      main: string
      description: string
    }
  ]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
}

const forecastData = ref<Forecast[]>([])

const isAlphabetic = (input: string) => {
  const cleanedInput = input?.replace(/%20/g, ' ')
  return /^[A-Za-z\s]+$/.test(cleanedInput)
}

const fetchWeatherData = async () => {
  isError.value = false
  loading.value = true
  forecastData.value = []

  const modifiedCity = city?.replace(' ', '%20')
  const searchCity = modifiedCity || getLastSearchedCity()

  if (!searchCity || !isAlphabetic(searchCity)) {
    isError.value = true
    errorMessage.value = 'The city is not found'
    loading.value = false
    return
  }
  try {
    const forecastResponse: any = await getFourDaysWeather(searchCity, temperatureUnit)
    const itemsToCollect = 4

    for (let i = 0; i < forecastResponse.list.length; i = i + 8) {
      forecastData.value.push(forecastResponse.list[i])
      forecastResponse.list[i]["city"] = forecastResponse.city.name
      if (forecastData.value.length === itemsToCollect) {
        break
      }
    }

    if (forecastData.value.length > 0) {
      weather.value = forecastData.value[0];
      forecastData.value.shift();
    } else {
      console.log("The array is empty.");
    }

    setLastSearchedCity(searchCity)
  } catch (error: any) {
    isError.value = true
    console.error(error)
    errorMessage.value = error.message
    forecastData.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchWeatherData()
})

const toggleTemperatureUnit = () => {
  temperatureUnit.value = temperatureUnit.value === 'C' ? 'F' : 'C'
  forecastData.value = []
  fetchWeatherData()
}

const goToSearch = () => {
  router.push({ name: 'home' })
}

const weatherBackgroundClass = computed(() => {
  if (weather.value?.weather?.[0]?.main) {
    const weatherCondition = weather.value.weather[0].main.toLowerCase()
    if (weatherCondition.includes('sunny') || weatherCondition.includes('clear')) {
      return 'bg-yellow-200'
    } else if (weatherCondition.includes('rain')) {
      return 'bg-blue-800'
    } else if (weatherCondition.includes('snow')) {
      return 'bg-gray-300'
    }
  }
  return 'bg-blue-200'
})

const setLastSearchedCity = (city: string) => {
  localStorage.setItem('lastSearchedCity', city)
}

const getLastSearchedCity = () => {
  return localStorage.getItem('lastSearchedCity') || ''
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const options: any = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
</script>

<style scoped></style>
