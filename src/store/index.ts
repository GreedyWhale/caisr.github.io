/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:15:33
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 15:35:04
 * @Description: vuex store配置
 */
import { createStore } from 'vuex'
import { Vuex } from '/@/types/vuex'

export default createStore<Vuex.State>({
  state: {
    articles: JSON.parse(JSON.stringify(GLOBAL_ARTICLES)),
    articleType: ''
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    }
  }
})
