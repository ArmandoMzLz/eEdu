export interface Book {
  id: number;
  title: string;
  author: string;
  categories: string[];
  urlBook: string;
  urlCover: string;
}

export interface Db {
  books: Book[];
}