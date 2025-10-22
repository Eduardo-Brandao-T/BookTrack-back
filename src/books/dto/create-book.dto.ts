export class CreateBookDto {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishedYear: number;
  coverUrl?: string;
  description?: string;
  pageCount?: number;
}
