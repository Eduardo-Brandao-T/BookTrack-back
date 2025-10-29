import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EMAIL_NOT_FOUND, INVALID_PASSWORD } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(EMAIL_NOT_FOUND);
    }
    if (!user.password || (await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(INVALID_PASSWORD);
    }

    const token = this.jwtService.sign({ userId: user.id });
    return {
      token,
      user,
    };
  }

  async googleLogin(email: string) {
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        email,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
