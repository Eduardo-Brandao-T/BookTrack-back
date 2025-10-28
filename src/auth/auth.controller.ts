import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { admin } from 'src/firebase/firebase-admin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded.email) {
      throw new BadRequestException('O token do Google não contém email.');
    }
    return this.authService.googleLogin(decoded.email);
  }
}
