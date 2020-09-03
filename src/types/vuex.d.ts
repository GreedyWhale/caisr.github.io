/*
 * @Author: MADAO
 * @Date: 2020-09-03 10:07:44
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 15:35:13
 * @Description: Vuex 类型文件
 */
import { Article, ArticlesItem } from '/@/types/articles'

declare module Vuex {
  export interface State {
    articles: ArticlesItem[];
    articleType: string;
  }
}