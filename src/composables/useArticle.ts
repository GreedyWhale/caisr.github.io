import { onMounted, ref } from 'vue'
import { articles } from '/@/utils'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as marked from 'marked'

export default function useArticle () {
  const articlesRef = ref(articles)
  const articleMarkDownRef = ref({
    html: '',
    articleAttributes: {}
  })

  const {
    name,
    params: { articleName, category }
  } = useRoute()
  const store = useStore<Vuex.State>()

  const filterWithArticleCategory = () => {
    const { state: { articleCategory } } = store
    if (articleCategory !== 'all') {
      return articlesRef.value.filter(value => {
        return value.category === articleCategory
      })
    }
    return articlesRef.value
  }

  const getCurrentArticleInfo = (name: string) => {
    const articles = filterWithArticleCategory()
    const article = articles.filter(value => value.name === name)[0]
    return article || {}
  }

  const setCurrentArticle = (category: string, name: string) => {
    if (name !== 'Article') {
      return ''
    }
    if (!category || !articleName) {
      alert('获取文章失败，请重试')
      return
    }
    const path = window.ENV === 'development' ? '' : '/madao.github.io'

    axios.get<string>(`${path}/database/articles/${category}/${articleName}.md`)
      .then((res) => {
        articleMarkDownRef.value = {
          // @ts-ignore
          html: marked.default(res.data),
          articleAttributes: getCurrentArticleInfo((articleName as string))
        }
      }).catch((err) => {
        console.log(err)
        alert('获取文章失败，请重试')
      })
  }

  onMounted(() => {
    setCurrentArticle((category as string), (name as string))
  })
  return {
    articlesRef,
    articleMarkDownRef,
    filterWithArticleCategory,
    setCurrentArticle
  }
}
