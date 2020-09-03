/*
 * @Author: MADAO
 * @Date: 2020-08-26 09:52:35
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 15:36:50
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/article/:name', name: 'Article', component: Article }
  ]
})

export default router
