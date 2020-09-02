// import { VueComponent } from './../../types/shims-md.d';
/*
 * @Author: MADAO
 * @Date: 2020-09-02 16:36:35
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-02 16:51:56
 * @Description: 获取文章组件
 */
import { useStore } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default function getArticleDetail (articleName: string) {
  const store = useStore()
  const { state: { articleType } } = store
  const path = `/@/articles/${articleType}/${articleName}.md`
  const component = defineAsyncComponent(() => {
    // warn non-props https://v3.vuejs.org/guide/component-attrs.html#disabling-attribute-inheritance
    return import(path).then(res => res.VueComponent)
  })
  return component
}
