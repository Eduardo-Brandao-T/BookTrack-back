import { BookStatus } from '@prisma/client';

export class CreateUserBookDto {
  userId: number;
  bookId: number;
  status: BookStatus;
  rating?: number;
  favorite?: boolean;
  review?: string;
  hasBook?: boolean;
  finishedAt?: Date;
}
