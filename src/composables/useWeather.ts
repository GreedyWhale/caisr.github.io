import { onMounted, ref, watch } from 'vue'
import { Store, useStore } from 'vuex'
import axios from 'axios'
import {
  getWeatherIcon,
  getWeekEnglishName
} from '/@/utils/index'

let store: Store<Vuex.State>

const fetchWeather = (extensions: 'all' | 'base' = 'base') => {
  return new Promise<any[]>((resolve, reject) => {
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
      params: {
        key: '0eac8f8b04cc8b8a84ea14da6c2d6c1a',
        city: store.state.cityCode,
        extensions
      }
    }).then(res => {
      if (res.data.status === '1') {
        resolve(res.data)
        return
      }
      reject()
    }, () => reject())
  })
}

const getAllWeather = () => {
  return Promise.all([fetchWeather(), fetchWeather('all')]).then(([livesWeather, forecastWeather]: any[]) => {
    return [livesWeather, forecastWeather]
  }, () => alert('get weather error'))
}

const setWeatherData = ([livesWeather, forecastWeather]: any[]) => {
  const weather = {
    lives: Object.assign({}, livesWeather.lives[0], {
      icon: getWeatherIcon(livesWeather.lives[0].weather)
    }),
    forecasts: forecastWeather.forecasts[0].casts.map((value: any) => (Object.assign({}, value, {
      icon: getWeatherIcon(new Date().getHours() >= 18 ? value.nightweather : value.dayweather),
      weekEn: getWeekEnglishName(value.week).enShort
    })))
  }
  return weather
}

export default function useWeather () {
  store = useStore()
  const defaultWeather:{lives: {}; forecasts: [];} = {
    lives: {},
    forecasts: []
  }
  const weather = ref(defaultWeather)

  const setWeather = () => {
    getAllWeather().then((res: any[]) => {
      weather.value = setWeatherData(res)
    })
  }

  watch(() => store.state.cityCode, () => {
    weather.value = defaultWeather
    setWeather()
  })

  onMounted(() => {
    setWeather()
  })

  return { weather, setWeather }
}
