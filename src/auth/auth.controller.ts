import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { admin } from 'src/firebase/firebase-admin';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.login(body.email, body.password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 20 * 60 * 60 * 1000,
    });

    return { user };
  }

  @Post('google')
  async googleLogin(@Body('idToken') idToken: string, @Res({ passthrough: true }) res: Response) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded.email) {
      throw new BadRequestException('O token do Google não contém email.');
    }

    const { user, token } = await this.authService.googleLogin(decoded.email);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    const userId = req['user'].userId;
    const user = await this.usersService.findById(userId);

    return { user };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return { message: 'Logout realizado com sucesso' };
  }
}
