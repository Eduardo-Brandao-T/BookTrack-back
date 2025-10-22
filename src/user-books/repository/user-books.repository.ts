import { Injectable } from '@nestjs/common';
import { UserBook } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserBookDto } from '../dto/create-user-book.dto';

@Injectable()
export class UserBooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserBook(data: CreateUserBookDto): Promise<UserBook> {
    return this.prisma.userBook.create({
      data,
    });
  }

  async findByByUser(userId: number): Promise<UserBook[]> {
    return this.prisma.userBook.findMany({
      where: { user: { id: userId } },
    });
  }

  async findUnique(bookId: number, userId): Promise<UserBook | null> {
    return this.prisma.userBook.findUnique({
      where: { userId_bookId: { bookId, userId } },
    });
  }

  async updateUserBook(id: number, data: Partial<CreateUserBookDto>): Promise<UserBook> {
    return this.prisma.userBook.update({
      where: { id },
      data,
    });
  }
}
