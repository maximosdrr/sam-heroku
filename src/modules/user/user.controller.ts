import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entitys/user.entity';
import { InsertResult } from 'typeorm';
import { LoginInterface } from './interfaces/login.interface';
import { JwtGuards } from 'src/guards/jwt.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
  insert(@Body() user: User): Promise<InsertResult> {
    return this.userService.insert(user);
  }

  @Post('login')
  async login(@Body() loginData: LoginInterface): Promise<object> {
    const user: User = await this.userService.login(
      loginData.username,
      loginData.password,
    );
    return this.userService.getToken(user);
  }
}
