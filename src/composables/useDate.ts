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
    date.value.diffForNetNewYear = `${weeks}w ${days % 7}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`
    setTimeout(() => getDiffForNetNewYear(), 1000)
  }
  onMounted(() => {
    getDiffForNetNewYear()
  })
  return { date }
}
