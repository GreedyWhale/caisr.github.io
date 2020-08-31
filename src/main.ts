/*
 * @Author: MADAO
 * @Date: 2020-08-25 15:44:03
 * @LastEditors: MADAO
 * @LastEditTime: 2020-08-28 14:51:09
 * @Description: 入口文件
 */
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import './index.scss'
import 'normalize.css'
import './assets/scss/reset.scss'

createApp(App)
  .use(router)
  .mount('#app')
