/*
 * @Author: MADAO
 * @Date: 2020-09-15 17:07:29
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-26 15:34:48
 * @Description: 日期相关方法
 */
import * as Calendar from 'date-chinese'

export const getChineseNewYear = (year: number): string => {
  // @ts-ignore
  const calendar = new Calendar.CalendarChinese()
  const newYear = calendar.newYear(year)
  calendar.fromJDE(newYear)
  const date: string = calendar.toDate()
  return date
}

export const getWeekEnglishName = (week: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
  const weekMap = {
    1: { en: 'Monday', enShort: 'Mon.' },
    2: { en: 'Tuesday', enShort: 'Tue.' },
    3: { en: 'Wednesday', enShort: 'Wed.' },
    4: { en: 'Thursday', enShort: 'Thu.' },
    5: { en: 'Friday', enShort: 'Fri.' },
    6: { en: 'Saturday', enShort: 'Sat.' },
    7: { en: 'Sunday', enShort: 'Sun.' }
  }

  return weekMap[week]
}

export const getDaysElapsed = () => {
  const currentDate = new Date()
  const oneDay = 86400000
  const begin = new Date(currentDate.getFullYear(), 1, 1).getTime()
  const days = (new Date(currentDate.getFullYear() + 1, 1, 1).getTime() - begin) / oneDay
  const daysElapsed = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()).getTime() - begin) / oneDay
  const dayRatio = ((daysElapsed / days) * 100).toFixed(2)
  return {
    days,
    daysElapsed,
    dayRatio
  }
}
