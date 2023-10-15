import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY

export async function getTodayWeather(city: any, temperatureUnit: any) {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/weather?q=${city}&units=${
        temperatureUnit.value === 'C' ? 'metric' : 'imperial'
      }&appid=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error Getting Today"s Weather:', error)
  }
}

export async function getThreeDaysWeather(city: any, temperatureUnit: any) {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/2.5/forecast?q=${city}&units=${
        temperatureUnit.value === 'C' ? 'metric' : 'imperial'
      }&appid=${API_KEY}`
    )
    return response.data
  } catch (error) {
    console.error('Error Getting 3-Days Forecast:', error)
    throw error
  }
}

export function getWeatherIconUrl(icon: any) {
  return `${BASE_URL}/img/w/${icon}.png`
}
