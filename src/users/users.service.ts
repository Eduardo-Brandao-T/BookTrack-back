// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let hashedPassword: string | undefined = undefined;
    if (createUserDto.password) {
      hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    }

    return this.usersRepository.createUser({
      ...createUserDto,
      ...(hashedPassword && { password: hashedPassword }),
      ...(createUserDto.birthDate && {
        birthDate: new Date(createUserDto.birthDate),
      }),
    });
  }

  async findMany(whereClause?: Prisma.UserWhereInput): Promise<User[]> {
    return this.usersRepository.findMany(whereClause);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let hashedPassword: string | undefined = undefined;
    if (updateUserDto.password) {
      hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.usersRepository.updateUser(id, {
      ...updateUserDto,
      ...(hashedPassword && { password: hashedPassword }),
      ...(updateUserDto.birthDate && {
        birthDate: new Date(updateUserDto.birthDate),
      }),
    });
  }
}
