/*
 * @Description: 日期相关hook
 * @Author: MADAO
 * @Date: 2021-01-06 12:18:35
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-08 17:15:15
 */
import { ref, onMounted } from 'vue'
import {
  getChineseNewYear,
  getDaysElapsed
} from '/@/utils/index'

export default function useDate () {
  const { days, daysElapsed, dayRatio } = getDaysElapsed()
  const date = ref({
    days,
    daysElapsed,
    dayRatio,
    diffForNetNewYear: '',
    currentDate: new Date()
  })
  const getDiffForNetNewYear = () => {
    const currentDate = new Date()
    const currentMilliseconds = currentDate.getTime()
    let year = currentDate.getFullYear()
    const currentNewYear = new Date(getChineseNewYear(year)).getTime()

    if (currentMilliseconds > currentNewYear) {
      year += 1
    }
    const newYear = new Date(getChineseNewYear(year)).getTime()
    const diff = newYear - currentMilliseconds
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
    date.value.diffForNetNewYear = `${weeks}w ${days % 7}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
    setTimeout(() => getDiffForNetNewYear(), 1000)
  }
  onMounted(() => {
    getDiffForNetNewYear()
  })
  return { date }
}
