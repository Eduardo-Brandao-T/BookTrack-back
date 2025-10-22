import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '@prisma/client';

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(data: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async findByISBN(isbn: string): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { isbn },
    });
  }

  async findById(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: { title: { contains: title, mode: 'insensitive' } },
    });
  }

  async updateBook(id: number, data: Partial<CreateBookDto>): Promise<Book> {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }
}
