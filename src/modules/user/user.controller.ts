import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entitys/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  UpdateUserData,
  UserUpdatedResponse,
} from './interfaces/user-update-data.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('insert')
  insert(@Body() user: User): Promise<any> {
    return this.userService.insert(user);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() user: UpdateUserData, @Request() req): Promise<any> {
    user.id = req.user.id;
    const updatedUser: User = await this.userService.update(user);
    const updatedUserResponse: UserUpdatedResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      username: updatedUser.username,
    };

    return updatedUserResponse;
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req): Promise<any> {
    const { id } = req.user;
    return this.userService.delete(id);
  }
}
