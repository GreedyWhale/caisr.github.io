/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:15:33
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-01 14:21:53
 * @Description: vuex store配置
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    articles: window.GLOBAL_ARTICLES,
    articleType: 'javascript'
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    }
  }
})
