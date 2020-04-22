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
}
