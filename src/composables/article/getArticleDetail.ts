// import { VueComponent } from './../../types/shims-md.d';
/*
 * @Author: MADAO
 * @Date: 2020-09-02 16:36:35
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 10:53:04
 * @Description: 获取文章组件
 */
import { useStore } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default function getArticleDetail () {
  const store = useStore()
  const { state: { currentArticle } } = store
  const component = defineAsyncComponent(() => {
    // warn non-props https://v3.vuejs.org/guide/component-attrs.html#disabling-attribute-inheritance
    return import(currentArticle.path).then(res => res.VueComponent)
  })
  return component
}
