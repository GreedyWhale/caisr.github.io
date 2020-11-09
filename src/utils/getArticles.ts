/*
 * @Author: MADAO
 * @Date: 2020-09-03 11:34:49
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 11:15:30
 * @Description: 所有文章组件
 */

import articles from './articles'

const formatTime = (timeStr: string): string => {
  const reg = /[年月日]+/g
  const date = timeStr.split(' ')
  return `${date[0].replace(reg, '-').slice(0, -1)} ${date[1]}`
}

const sortHandler = (a: any, b: any) => {
  return new Date(formatTime(b.attributes.time)).getTime() - new Date(formatTime(a.attributes.time)).getTime()
}

const sortedArticles = articles.map((value) => value).sort(sortHandler)

export default sortedArticles
