/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:05:05
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-01 16:14:59
 * @Description: 获取首页文章列表
 */
import { ref, Ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Articles } from '/@/types/articles'

export default function articlesTool (): {
  articleList: Ref<Articles>,
  getArticles: () => Promise<Articles>
  } {
  const store = useStore()
  const { state: { articleType, articles } } = store
  const articleList = ref<Articles>([])
  const getArticles = (): Promise<Articles> => {
    const result: Articles = []
    const promiseList = articles[articleType].map((value: string) => {
      const fn = async () => {
        const attributes = await import(`/@/articles/${articleType}/${value}`)
          .then(res => res.attributes)
        result.push(attributes)
      }
      return fn()
    })
    return new Promise(resolve => {
      Promise.all(promiseList).then(() => {
        result.sort((a, b) => new Date(b.description).getTime() - new Date(a.description).getTime())
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
