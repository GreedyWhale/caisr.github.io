/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:32:00
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-15 10:50:07
 * @Description: 文章类型文件
 */

export interface ArticlesItem {
  articleType: string;
  path: string;
}

 export interface Article {
  title: string;
  description: string;
  time: string;
  author: string;
  articleType: string;
  name: string;
}

export type Articles = Article[];