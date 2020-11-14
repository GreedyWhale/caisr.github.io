/*
 * @Author: MADAO
 * @Date: 2020-09-03 11:34:49
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 11:15:30
 * @Description: 所有文章组件
 */

import articles from './articles'
import { Article } from '/@/types/articles'

const formatTime = (timeStr: string): string => {
  const reg = /[年月日]+/g
  const date = timeStr.split(' ')
  return `${date[0].replace(reg, '-').slice(0, -1)} ${date[1]}`
}

const sortHandler = (a: Article, b: Article) => {
  return new Date(formatTime(b.time)).getTime() - new Date(formatTime(a.time)).getTime()
}

const sortedArticles = articles.map((value) => value).sort(sortHandler)

export default sortedArticles
