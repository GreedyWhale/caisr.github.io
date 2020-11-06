/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:05:05
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 11:21:55
 * @Description: 获取首页文章列表
 */
import { articles } from '/@/utils'
import { useStore, Store } from 'vuex'

export function getArticlesAttributes (store?: Store<Vuex.State>) {
  const currentArticleList = getCurrentArticleList(store)
  const articlesAttributes = currentArticleList.map(value => value.attributes)

  return articlesAttributes
}

export function getCurrentArticleList (store?: Store<Vuex.State>) {
  const { state: { articleType } } = store || useStore<Vuex.State>()
  let articleList = articles
  if (articleType !== 'all') {
    articleList = articles.filter(value => {
      return value.attributes.articleType === articleType
    })
  }
  return articleList
}

export function getCurrentArticle (name: string): {
  VueComponent: any;
  attributes: {
    [key: string]: string
  }
} {
  const currentArticleList = getCurrentArticleList()
  let result = {
    VueComponent: null,
    attributes: {}
  }
  currentArticleList.some(value => {
    if (value.attributes.name === name) {
      result = value
      return true
    }
    return false
  })

  return result
}
