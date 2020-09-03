/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:05:05
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 17:04:57
 * @Description: 获取首页文章列表
 */
import { ref } from 'vue'
import { articles } from '/@/utils'
import { useStore } from 'vuex'

export function getArticlesAttributes () {
  const articlesAttributes = ref<{[key: string]: string;}[]>([])
  articlesAttributes.value = articles.map(value => value.attributes)

  return articlesAttributes
}

export function getCurrentArticleList () {
  const { state: { articleType } } = useStore()
  const articleList = ref<any[]>(articles)
  if (articleType) {
    articleList.value = articles.filter(value => {
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
