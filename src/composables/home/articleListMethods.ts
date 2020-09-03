/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:05:05
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 10:52:36
 * @Description: 获取首页文章列表
 */
import { ref, Ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Articles } from '/@/types/articles'
import { Vuex } from '/@/types/vuex'

const formatTime = (timeStr: string): string => {
  const reg = /[年月日]+/g
  return timeStr.replace(reg, '-').slice(0, -1)
}
export default function articleListMethods (): {
  articleList: Ref<Articles>,
  getArticles: () => Promise<Articles>
  } {
  const store = useStore<Vuex.State>()
  const { state: { articleType, articles } } = store
  const articleList = ref<Articles>([])
  const getArticles = (): Promise<Articles> => {
    const result: Articles = []
    let currentArticles = articles
    if (articleType) {
      currentArticles = articles.filter((value) => value.articleType === articleType)
    }
    const promiseList = currentArticles.map((value) => {
      const fn = async () => {
        const attributes = await import(value.path)
          .then(res => res.attributes)
        result.push({
          ...value,
          ...attributes
        })
      }
      return fn()
    })
    return new Promise(resolve => {
      Promise.all(promiseList).then(() => {
        result.sort((a, b) => new Date(formatTime(b.time)).getTime() - new Date(formatTime(a.time)).getTime())
        articleList.value = result
        resolve(result)
      })
    })
  }
  onMounted(getArticles)
  return {
    articleList,
    getArticles
  }
}
