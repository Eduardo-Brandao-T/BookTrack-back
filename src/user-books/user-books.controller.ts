import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserBooksService } from './user-books.service';
import { CreateUserBookDto } from './dto/create-user-book.dto';
import { UpdateUserBookDto } from './dto/update-user-book.dto';

@Controller('user-books')
export class UserBooksController {
  constructor(private readonly userBooksService: UserBooksService) {}

  @Post()
  create(@Body() createUserBookDto: CreateUserBookDto) {
    return this.userBooksService.create(createUserBookDto);
  }

  @Get(':userId')
  findByUser() {
    return this.userBooksService.findByUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBookDto: UpdateUserBookDto) {
    return this.userBooksService.update(+id, updateUserBookDto);
  }
}
