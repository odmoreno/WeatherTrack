import axios from 'axios'
import { SearchType } from '../types'

export default function useWeather (){
  
  const fetchWeather = async(search : SearchType) => {
    const appid = 'dca4ddf188c7529501334a6fd665bdc0'
    try {
       const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`

       const data = await axios(geoUrl)
       console.log(data)
       console.log(geoUrl)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    fetchWeather
  }
}  