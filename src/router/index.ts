/*
 * @Author: MADAO
 * @Date: 2020-08-26 09:52:35
 * @LastEditors: MADAO
 * @LastEditTime: 2020-08-28 15:24:17
 * @Description: 路由配置
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home }
  ]
})

export default router
