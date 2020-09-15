/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:05:05
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 11:21:55
 * @Description: 获取首页文章列表
 */
import { ref } from 'vue'
import { articles } from '/@/utils'
import { useStore } from 'vuex'
import { Vuex } from './../types/vuex.d'

export function getArticlesAttributes () {
  const { state: { mode } } = useStore<Vuex.State>()
  const articlesAttributes = ref<{[key: string]: string;}[]>([])
  articlesAttributes.value = articles[mode].map(value => value.attributes)

  return articlesAttributes
}

export function getCurrentArticleList () {
  const { state: { articleType, mode } } = useStore<Vuex.State>()
  const articleList = ref<any[]>(articles[mode])
  if (articleType) {
    articleList.value = articles[mode].filter(value => {
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
  currentArticleList.value.some(value => {
    if (value.attributes.name === name) {
      result = value
      return true
    }
    return false
  })

  return result
}
