/*
 * @Author: MADAO
 * @Date: 2020-09-01 14:32:00
 * @LastEditors: MADAO
 * @LastEditTime: 2020-09-03 10:44:19
 * @Description: 文章类型文件
 */

export interface ArticlesItem {
  articleType: string;
  path: string;
}

 export interface Article extends ArticlesItem {
  title: string;
  description: string;
  time: string;
  tags: string[];
}

export type Articles = Article[];