import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entitys/user.entity';
import { InsertResult } from 'typeorm';
import { LoginInterface } from './interfaces/login.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
  insert(@Body() user: User): Promise<InsertResult> {
    return this.userService.insert(user);
  }

  @Post('login')
  async login(@Body() loginData: LoginInterface): Promise<object> {
    const user: User = await this.userService.login(loginData);
    return this.userService.getToken(user);
  }
}
