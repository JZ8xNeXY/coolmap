import axios from 'axios'

interface WeatherData {
  publicTime: string
  title: string
  description: string
  forecasts: Forecast[]
}

interface Forecast {
  date: string
  dateLabel: string
  telop: string
  temperature: {
    min: {
      celsius: string | null
    }
    max: {
      celsius: string | null
    }
  }
  chanceOfRain: {
    [key: string]: string
  }
  image: {
    title: string
    url: string
    width: number
    height: number
  }
}

const WEATHER_API_URL =
  'https://weather.tsukumijima.net/api/forecast/city/130010'

export const getWeatherData = async (): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(WEATHER_API_URL)
    const data = response.data

    const weatherData: WeatherData = {
      publicTime: data.publicTime,
      title: data.title,
      description: data.description.text,
      forecasts: data.forecasts.map((forecast: any) => ({
        date: forecast.date,
        dateLabel: forecast.dateLabel,
        telop: forecast.telop,
        temperature: forecast.temperature,
        chanceOfRain: forecast.chanceOfRain,
        image: forecast.image,
      })),
    }

    return weatherData
  } catch (error) {
    console.error('Failed to fetch weather data', error)
    return null
  }
}
