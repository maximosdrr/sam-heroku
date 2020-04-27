import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entitys/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { HttpExceptionFilter } from '../../shared/http-exception/filter';
import { DeleteResult } from 'typeorm';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
  insert(@Body() user: User): Promise<any> {
    return this.userService.insert(user);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() user, @Request() req): Promise<any> {
    user.id = req.user.id;
    const updatedUser: User = await this.userService.update(user);
    const updatedUserResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      username: updatedUser.username,
    };

    return updatedUserResponse;
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req): Promise<DeleteResult> {
    const { id } = req.user;
    return this.userService.delete(id);
  }

  @Put('changePassword')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Request() req, @Body() data): Promise<any> {
    const { id } = req.user;
    const user: User = await this.userService.changePassword(
      id,
      data.oldPassword,
      data.newPassword,
    );
    return {
      user: user.username,
      email: user.email,
      status: 'Password changed',
    };
  }
  @Put('changeEmail')
  @UseGuards(JwtAuthGuard)
  async changeEmail(@Request() req, @Body() data): Promise<any> {
    const { id } = req.user;
    const user: User = await this.userService.changeEmail(id, data.email);
    return {
      user: user.username,
      email: user.email,
      status: 'Email changed',
    };
  }
}
