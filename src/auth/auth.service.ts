import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EMAIL_NOT_FOUND, INVALID_PASSWORD } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    const accessToken = this.jwtService.sign({ userId: user.id });
    return {
      access_token: accessToken,
      user,
    };
  }

  async googleLogin(idToken: string) {
    if (!idToken) {
      throw new UnauthorizedException('ID Token não fornecido');
    }

    let payload: any;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      payload = ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Token Google inválido ou expirado');
    }

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Token Google sem e-mail válido');
    }

    let user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      user = await this.usersService.create({
        email: payload.email,
      });
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return {
      access_token: accessToken,
      user,
    };
  }
}
