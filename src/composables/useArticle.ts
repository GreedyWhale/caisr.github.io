/*
 * @Description: 文章相关hooks
 * @Author: MADAO
 * @Date: 2021-01-06 12:18:35
 * @LastEditors: MADAO
 * @LastEditTime: 2021-01-26 15:55:03
 */
import { onMounted, ref, computed, watch } from 'vue'
import { articles } from '/@/utils'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as marked from 'marked'
import { useToast } from '/@/plugin/index'

export default function useArticle () {
  const articlesRef = ref(articles)
  const articleMarkDownRef = ref({
    html: '',
    articleAttributes: {}
  })
  const route = useRoute()
  const toast = useToast()
  const lastArticleName = ref('')
  const lastCategory = ref('')
  const isArticlePage = computed(() => route.name === 'Article')
  const articleName = computed(() => route.params.articleName)

  const articleCategory = computed(() => route.params.category)

  const store = useStore<Vuex.State>()

  const showErrorMessage = () => {
    toast?.show({
      title: '出错了',
      message: '获取文章信息失败，请重试',
      theme: 'error',
      delay: -1
    })
  }

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

  const setCurrentArticle = () => {
    if (!isArticlePage.value) {
      return ''
    }
    const { params: { category, articleName } } = route
    if (!category || !articleName) {
      showErrorMessage()
      return
    }

    const path = ENV === 'development' ? '' : '/madao.github.io'

    axios.get<string>(`${path}/database/articles/${category}/${articleName}.md`)
      .then((res) => {
        articleMarkDownRef.value = {
          html: marked.parse(res.data),
          articleAttributes: getCurrentArticleInfo((articleName as string))
        }
      }).catch((err) => {
        console.log(err)
        showErrorMessage()
      })
  }
  watch(() => [articleName, articleCategory], (value) => {
    if ((value[0].value !== lastArticleName.value) || (value[1].value !== lastCategory.value)) {
      lastArticleName.value = (value[0].value as string)
      lastCategory.value = (value[1].value as string)
      setCurrentArticle()
    }
  }, { deep: true })
  onMounted(() => {
    setCurrentArticle()
  })
  return {
    articlesRef,
    articleMarkDownRef,
    filterWithArticleCategory,
    setCurrentArticle,
    isArticlePage
  }
}
