/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:32:00
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-19 16:05:34
 * @Description: 文章类型文件
 */

 export interface Article {
  title: string;
  description: string;
  time: string;
  author: string;
  articleType: string;
  name: string;
}

export type Articles = Article[];