/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:15:33
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-02 18:02:08
 * @Description: vuex store配置
 */
import { createStore } from 'vuex'

export default createStore({
  state: {
    articles: JSON.parse(GLOBAL_ARTICLES),
    articleType: 'javascript'
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    }
  }
})
