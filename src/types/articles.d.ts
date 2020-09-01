export interface Article {
  title: string;
  description: string;
  time: string;
  bg: string;
  tags: string[];
}

export type Articles = Article[];