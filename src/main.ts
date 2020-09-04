/*
 * @Author: MADAO
 * @Date: 2020-08-25 15:44:03
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-04 10:38:02
 * @Description: 入口文件
 */
import { createApp } from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import './index.scss'
import 'normalize.css'
import './assets/scss/reset.scss'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
