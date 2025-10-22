import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './repository/books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.createBook(createBookDto);
  }

  findAll() {
    return this.booksRepository.findAll();
  }

  findById(id: number) {
    return this.booksRepository.findById(id);
  }

  findByISBN(isbn: string) {
    return this.booksRepository.findByISBN(isbn);
  }

  findByTitle(title: string) {
    return this.booksRepository.findByTitle(title);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.updateBook(id, updateBookDto);
  }
}
