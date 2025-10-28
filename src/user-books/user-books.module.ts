import { Module } from '@nestjs/common';
import { UserBooksService } from './user-books.service';
import { UserBooksController } from './user-books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserBooksRepository } from './repository/user-books.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserBooksController],
  providers: [UserBooksService, UserBooksRepository],
})
export class UserBooksModule {}
