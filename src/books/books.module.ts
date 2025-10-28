import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksRepository } from './repository/books.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
