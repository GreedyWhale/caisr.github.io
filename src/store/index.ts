/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:15:33
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 11:01:11
 * @Description: vuex store配置
 */
import { createStore } from 'vuex'
import { Vuex } from '/@/types/vuex'
import { Article } from '/@/types/articles'

export default createStore<Vuex.State>({
  state: {
    articles: JSON.parse(JSON.stringify(GLOBAL_ARTICLES)),
    articleType: '',
    currentArticle: {
      title: '',
      description: '',
      time: '',
      tags: [],
      path: '',
      articleType: ''
    }
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    },
    updateCurrentArticle (state, value: Article) {
      state.currentArticle = value
    }
  }
})
