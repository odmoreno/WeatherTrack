import axios from 'axios'
import { z } from 'zod'
import { SearchType } from '../types'


//Type GUARD o ASSERTION
//function isWeatherResponse(weather: unknown): weather is Weather {
//
//  return (
//    Boolean(weather) &&
//    typeof weather === 'object' &&
//    typeof (weather as Weather).name === 'string' &&
//    typeof (weather as Weather).main.temp === 'number' &&
//    typeof (weather as Weather).main.temp_max === 'number' &&
//    typeof (weather as Weather).main.temp_min === 'number'
//  )
//}

//Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  })
})

type Weather = z.infer<typeof Weather>

export default function useWeather() {

  const fetchWeather = async (search: SearchType) => {
    const appid = import.meta.env.VITE_API_KEY
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
      const { data } = await axios(geoUrl)

      const lat = data[0].lat
      const lon = data[0].lon

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`

      //castear el type
      //const { data: weatherResult } = await axios<Weather>(weatherUrl)
      //console.log(weatherResult.main.temp)
      //console.log(weatherResult.main.temp_max)

      //type guard
      //const { data: weatherResult } = await axios(weatherUrl)
      //const result = isWeatherResponse(weatherResult)
      //if (result) {
      //  console.log(
      //    weatherResult.main)
      //}

      //Zod
      const { data: weatherResult } = await axios(weatherUrl)
      const result = Weather.safeParse(weatherResult)
      console.log(result)
      if (result.success) {
        console.log(result.data.name)
        console.log(result.data.main.temp)
      } else {
        console.log('respuesta mal formada')
      }


    } catch (error) {
      console.log(error)
    }
  }
  return {
    fetchWeather
  }
}  