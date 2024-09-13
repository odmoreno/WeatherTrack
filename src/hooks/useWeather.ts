import axios from 'axios'
import { SearchType, Weather } from '../types'

export default function useWeather() {

  const fetchWeather = async (search: SearchType) => {
    const appid = import.meta.env.VITE_API_KEY
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
      const { data } = await axios(geoUrl)

      const lat = data[0].lat
      const lon = data[0].lon

      //castear el type
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
      const { data: weatherResult } = await axios<Weather>(weatherUrl)
      console.log(weatherResult.main.temp)
      console.log(weatherResult.main.temp_max)

    } catch (error) {
      console.log(error)
    }
  }
  return {
    fetchWeather
  }
}  