import { ref } from 'vue'
import { articles } from '/@/utils'
import { useStore } from 'vuex'

export default function useArticle () {
  const articlesRef = ref(articles)
  const store = useStore<Vuex.State>()

  const filterWithArticleType = () => {
    const { state: { articleType } } = store
    if (articleType !== 'all') {
      return articlesRef.value.filter(value => {
        return value.attributes.articleType === articleType
      })
    }
    return articlesRef.value
  }

  const getCurrentArticle = (name: string): {
    VueComponent: any;
    attributes: { [key: string]: string }
  } => {
    const currentArticleList = filterWithArticleType()
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

  return {
    articlesRef,
    filterWithArticleType,
    getCurrentArticle
  }
}
