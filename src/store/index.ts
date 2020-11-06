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
    articleType: 'all',
    cityCode: '440100'
  },

  mutations: {
    updateArticleType (state, value: string) {
      state.articleType = value
    },
    updateCityCode (state, value: string) {
      state.cityCode = value
    }
  }
})
