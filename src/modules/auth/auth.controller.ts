import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('decodeUserToken')
  getUser(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('verifyToken')
  verifyToken(@Request() req) {
    return { auth: true, user: req.user };
  }
}
