// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findMany(whereClause?: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where: whereClause,
    });
  }

  async findOne(whereClause: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: whereClause,
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    whereClause: Prisma.UserWhereUniqueInput,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.prisma.user.update({
      where: whereClause,
      data: updateUserDto,
    });
  }
}
