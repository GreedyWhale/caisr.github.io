/*
 * @Author: MADAO
 * @Date: 2020-09-03 10:07:44
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-19 16:05:25
 * @Description: Vuex 类型文件
 */

declare module Vuex {
  export type Mode = 'blogs' | 'notes';
  export interface State {
    articleMenu: string;
    articleType: string;
    mode: Mode;
    cityCode: string;
  }
}