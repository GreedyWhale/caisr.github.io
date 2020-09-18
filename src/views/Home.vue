<template>
  <div class="home">
    <div class="home-pane">
      <div>
        <h1 class="home-pane__title">MADAO'S BLOG</h1>
        <div class="home-pane__top">
          <div class="home-pane__time">
            <div class="home-pane__battery">
              <div><span :style="batteryStyle"></span></div>
              <p>Life: {{ currentLife }}%</p>
            </div>
            <div class="home-pane__next-year">
              <h3>Next New Year</h3>
              <p>{{ data.diffForNetNewYear }}</p>
            </div>
          </div>
          <div class="home-pane__weather">
            <div class="home-pane__weather-lives">
              <div class="home-pane__weather-city">
                <p>
                  {{ data.weather.lives.city }}
                  <img
                    src="/@/assets/images/localtion.png"
                    alt="localtion-icon"
                    @click="data.visibleCityPicker = true">
                </p>
                <p>{{ data.currentDate.toLocaleDateString() }}</p>
              </div>
              <img :src="data.weather.lives.icon" alt="weather-icon">
              <div class="home-pane__weather-temperature">
                <p>{{ data.weather.lives.temperature }}</p>
                <p>{{ data.weather.lives.weather }}</p>
              </div>
            </div>
            <ul class="home-pane__weather-forecast">
              <li v-for="item in data.weather.forecasts" :key="item.weekEn">
                <h3>{{ item.weekEn }}</h3>
                <img :src="item.icon" alt="weather-icon">
                <p>{{ item.daytemp }}</p>
                <p>{{ item.nighttemp }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home-pane__progress">
        <h3>{{ data.currentDate.getFullYear() }}年时间进度</h3>
        <table>
          <thead>
            <tr>
              <th><p>年份</p></th>
              <th><p>总视图</p></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ data.currentDate.getFullYear() }}年</td>
              <td>
                <ul>
                  <li v-for="item in days" :key="item" :data-active="item > daysElapsed"></li>
                </ul>
                <p>{{ data.currentDate.getFullYear() }}年已过去{{ daysElapsed }}天</p>
                <p>约占全年的 {{ dayRatio }}%</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="article-list">
      <ul v-if="articlesAttributes.length" :data-has-remainder="articlesAttributes.length % 3 !== 0">
        <li v-for="item in articlesAttributes" :key="item.title" @click="toArticleDetail(item.name)">
          <div>
            <div class="article-list__icon" :data-type="item.articleType"></div>
            <h2 class="article-list__title">{{ item.title }}</h2>
            <p class="article-list__desc">{{ item.description }}</p>
          </div>
          <div class="article-list__meta">
            <p>发布时间：{{ item.time }}</p>
            <p>作者：{{ item.author }}</p>
          </div>
        </li>
      </ul>
    </div>
    <CityPicker
      v-if="data.visibleCityPicker"
      @on-cancel="data.visibleCityPicker = false"
      @on-confirm="data.visibleCityPicker = false" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  defineAsyncComponent,
  watch
} from 'vue'
import { getArticlesAttributes } from '/@/composables/articleMethods'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  getChineseNewYear,
  getWeatherIcon,
  getWeekEnglishName,
  getDaysElapsed
} from '/@/utils/index'
import axios from 'axios'
import { Vuex } from '/@/types/vuex'

export default defineComponent({
  name: 'Home',
  components: {
    CityPicker: defineAsyncComponent(() => import('/@/components/CityPicker.vue'))
  },
  setup () {
    const router = useRouter()
    const store = useStore<Vuex.State>()
    const data = reactive({
      diffForNetNewYear: '',
      weather: {
        lives: {},
        forecasts: []
      },
      currentDate: new Date(),
      visibleCityPicker: false
    })
    const currentLife = (() => {
      const currentDate = new Date()
      const startTime = new Date('1994/05/15')
      const endTime = new Date(new Date(startTime).setFullYear(startTime.getFullYear() + 65))
      const ratio = ((1 - ((currentDate.getTime() - startTime.getTime()) / endTime.getTime())) * 100).toFixed(0)
      return ratio
    })()
    const batteryStyle = computed(() => {
      const style: { [key: string]: string } = {
        width: `${currentLife}%`
      }
      if (parseInt(currentLife, 10) === 100) {
        style['border-top-right-radius'] = '4px'
        style['border-bottom-right-radius'] = '4px'
      }
      return style
    })
    const articlesAttributes = getArticlesAttributes()
    const { days, daysElapsed, dayRatio } = getDaysElapsed()

    const getDiffForNetNewYear = () => {
      const currentDate = new Date()
      const currentgetMilliseconds = currentDate.getTime()
      const newYear = new Date(getChineseNewYear(currentDate.getFullYear() + 1)).getTime()
      const diff = newYear - currentgetMilliseconds
      // 秒数
      const seconds = Math.floor(diff / 1000)
      // 分钟数
      const minutes = Math.floor(seconds / 60)
      // 小时数
      const hours = Math.floor(minutes / 60)
      // 天数
      const days = Math.floor(hours / 24)
      // 周数
      const weeks = Math.floor(days / 7)
      data.diffForNetNewYear = `${weeks}w ${days % 7}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
      setTimeout(() => getDiffForNetNewYear(), 1000)
    }
    const toArticleDetail = (name: string) => {
      router.push(`/article/${name}`)
    }
    const getWeather = (extensions: 'all' | 'base' = 'base') => {
      return new Promise((resolve, reject) => {
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
      Promise.all([getWeather(), getWeather('all')]).then(([livesWeather, forecastWeather]: any[]) => {
        setWeatherData([livesWeather, forecastWeather])
      }, () => alert('get weather error'))
    }
    const setWeatherData = ([livesWeather, forecastWeather]: any[]) => {
      data.weather = {
        lives: Object.assign({}, livesWeather.lives[0], {
          icon: getWeatherIcon(livesWeather.lives[0].weather)
        }),
        forecasts: forecastWeather.forecasts[0].casts.map((value: any) => (Object.assign({}, value, {
          icon: getWeatherIcon(new Date().getHours() >= 18 ? value.nightweather : value.dayweather),
          weekEn: getWeekEnglishName(value.week).enShort
        })))
      }
    }
    watch(() => store.state.cityCode, () => {
      getAllWeather()
    }, { immediate: true })

    onMounted(() => {
      getDiffForNetNewYear()
    })

    return {
      articlesAttributes,
      toArticleDetail,
      currentLife,
      batteryStyle,
      data,
      days,
      daysElapsed,
      dayRatio
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/tool.scss';

@include fontFace('Odachi', '../assets/fonts');
.home {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: rgb(26,26,28);
  display: flex;
  align-items: flex-start;
  &-pane {
    width: 40%;
    min-width: 600px;
    height: 100%;
    padding: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 40px;
    &__title {
      letter-spacing: 5px;
      font-size: 42px;
      line-height: 1.5;
      margin-bottom: 40px;
      font-family: 'Odachi';
    }
    &__top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 50px;
    }
    &__time {
      flex: 1;
    }
    &__battery {
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      padding-top: 10px;
      > div {
        width: 60px;
        height: 20px;
        border: 2px solid #fff;
        border-radius: 4px;
        margin-right: 5px;
        flex: none;
        position: relative;
        padding: 2px;
        > span {
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
          height: 100%;
          border: 2px solid rgb(22, 22, 22);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }
      > p {
        font-size: 14px;
      }
    }
    &__next-year {
      width: 160px;
      > h3 {
        font-size: 16px;
        margin-bottom: 20px;
      }
      > p {
        font-size: 16px;
      }
    }
    &__weather {
      flex: 1;
      &-lives {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
      }
      &-city {
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        letter-spacing: 2px;
        line-height: 1.5;
        > p:nth-of-type(1) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > img {
            width: 24px;
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
      &-temperature {
        > p:nth-of-type(1) {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          &::after {
            content: '';
            background: url('../assets/images/weather/degree.png') no-repeat center / 100%;
            width: 24px;
            height: 24px;
            margin-left: 2px;
          }
        }
        > p:nth-of-type(2) {
          font-size: 12px;
          text-align: center;
        }
      }
      &-forecast {
        display: flex;
        align-items: center;
        > li {
          flex: 1 0 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          > h3 {
            font-weight: normal;
            font-size: 16px;
            margin-bottom: 15px;
          }
          > img {
            width: 36px;
            margin-bottom: 10px;
          }
          > p {
            font-size: 14px;
            display: flex;
            align-items: center;
            &:nth-of-type(1) {
              font-weight: bold;
            }
            &::after {
              content: '';
              background: url('../assets/images/weather/degree.png') no-repeat center / 100%;
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
    &__progress {
      > h3 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        &::before {
          content: '';
          width: 24px;
          height: 24px;
          background: url('../assets/images/sandglass.png') no-repeat center / 100%;
          margin-right: 10px;
        }
      }
      > table {
        width: 100%;
        border-spacing: 0;
        color: #c4bebe;
        thead th {
          border-top: 1px solid rgb(95, 95, 95);
          border-bottom: 1px solid  rgb(95, 95, 95);
          font-weight: normal;
          font-size: 16px;
          > p {
            display: flex;
            align-items: center;
            &::before {
              content: '';
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
          }
          &:nth-of-type(1) {
            width: 30%;
            border-right: 1px solid rgb(95, 95, 95);
            > p {
              &::before {
                background: url('../assets/images/years.png') no-repeat center / 100%;
              }
            }
          }
          &:nth-of-type(2) {
            width: 70%;
            > p {
              &::before {
                background: url('../assets/images/sum.png') no-repeat center / 100%;
              }
            }
          }
        }
        tbody td {
          vertical-align: top;
          &:nth-of-type(1) {
            border-right: 1px solid rgb(95, 95, 95);
            text-decoration: underline;
          }
        }
        td > ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          > li {
            flex: 0 0 auto;
            width: 10px;
            height: 10px;
            background: rgb(59, 69, 97);
            margin-right: 5px;
            margin-bottom: 5px;
            &[data-active="true"] {
              background: #f2a0a1;
            }
          }
        }
        td > p {
          font-size: 14px;
          line-height: 1.5;
          &:nth-of-type(1) {
            margin-top: 30px;
          }
        }
        th, td {
          text-align: left;
          padding: 0.5em 5px 0.5em 10px;
        }
      }
    }
  }
  .article-list {
    overflow-y: auto;
    min-width: 580px;
    height: 100%;
    flex: 1;
    @include scrollBar;
    > ul {
      padding: 20px 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: hidden;
      > li {
        flex: 0 0 32%;
        border: 2px solid rgb(40, 40, 40);
        border-radius: 8px;
        padding: 20px;
        color: #fff;
        cursor: pointer;
        margin-bottom: 25px;
        min-height: 280px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:hover {
          opacity: 0.8;
        }
      }
      &[data-has-remainder="true"] {
        &::after {
          content: '';
          flex: 0 0 32%;
        }
      }
    }
    &__title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 600;
      line-height: 1.5;
    }
    &__desc {
      @include multipleEllipsis(2);
      height: auto;
      margin-bottom: 30px;
      opacity: 0.8;
      line-height: 1.5;
    }
    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      $types: 'javascript', 'css', 'miniprogram', 'vue', 'gadgets', 'python', 'webgl', 'node', 'threejs', 'other', 'webpack', 'typescript', 'google';
      @each $type in $types {
        &[data-type="#{$type}"] {
          background-image: url('../assets/images/#{$type}.png');
        }
      }
    }
    &__meta > p {
      color: #909090;
      margin-bottom: 5px;
    }
  }
}
</style>
