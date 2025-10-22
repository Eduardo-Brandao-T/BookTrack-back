import { Injectable } from '@nestjs/common';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';
import { UserBooksRepository } from './repository/user-books.repository';

@Injectable()
export class UserBooksService {
  constructor(private readonly userBooksRepository: UserBooksRepository) {}

  create(createUserBookDto: CreateUserBookDto) {
    return this.userBooksRepository.createUserBook(createUserBookDto);
  }

  findByUser(userId: number) {
    return this.userBooksRepository.findByByUser(userId);
  }

  findOne(userId: number, bookId: number) {
    return this.userBooksRepository.findUnique(bookId, userId);
  }

  update(id: number, updateUserBookDto: UpdateUserBookDto) {
    return this.userBooksRepository.updateUserBook(id, updateUserBookDto);
  }
}
