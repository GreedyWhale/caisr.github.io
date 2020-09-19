/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:15:33
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-19 16:05:52
 * @Description: vuex store配置
 */
import { createStore } from 'vuex'

export default createStore<Vuex.State>({
  state: {
    articleMenu: JSON.parse(JSON.stringify(GLOBAL_ARTICLES)),
    articleType: '',
    mode: 'blogs', // 'blogs' - 博客，'notes' - '读书笔记'
    cityCode: '440100'
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    },
    updateMode (state, value: Vuex.Mode) {
      state.mode = value
    },
    updateCityCode (state, value: string) {
      state.cityCode = value
    }
  }
})
