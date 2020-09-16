<template>
  <div class="home">
    <div class="home-pane">
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
              <p>{{ data.weather.lives.city }}</p>
              <p>WEATHER</p>
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
      <div class=""></div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted } from 'vue'
import { getArticlesAttributes } from '/@/composables/articleMethods'
import { useRouter } from 'vue-router'
import {
  getChineseNewYear,
  getWeatherIcon,
  getWeekEnglishName,
  getDaysElapsed
} from '/@/utils/index'
import axios from 'axios'

export default defineComponent({
  name: 'Home',
  setup () {
    const router = useRouter()
    const data = reactive({
      diffForNetNewYear: '',
      citycode: '440100',
      weather: {
        lives: {},
        forecasts: []
      }
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
    const { days, daysElapsed } = getDaysElapsed()

    const getWeather = (extensions: 'all' | 'base' = 'base') => {
      return new Promise((resolve, reject) => {
        axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
          params: {
            key: '0eac8f8b04cc8b8a84ea14da6c2d6c1a',
            city: data.citycode,
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

    onMounted(() => {
      getDiffForNetNewYear()
      Promise.all([getWeather(), getWeather('all')]).then(([livesWeather, forecastWeather]: any[]) => {
        setWeatherData([livesWeather, forecastWeather])
      }, () => alert('get weather error'))
    })

    return {
      articlesAttributes,
      toArticleDetail,
      currentLife,
      batteryStyle,
      data,
      days,
      daysElapsed
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
