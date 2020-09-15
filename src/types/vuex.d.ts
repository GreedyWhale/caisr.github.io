/*
 * @Author: MADAO
 * @Date: 2020-09-03 10:07:44
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 11:10:35
 * @Description: Vuex 类型文件
 */
import { ArticlesItem } from '/@/types/articles'

declare module Vuex {
  export type Mode = 'blogs' | 'notes';
  export interface State {
    articles: ArticlesItem[];
    articleType: string;
    mode: Mode;
  }
}