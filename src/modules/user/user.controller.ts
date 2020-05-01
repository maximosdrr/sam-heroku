import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Put,
  Delete,
  UseFilters,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entitys/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { HttpExceptionFilter } from '../../shared/http-exception/filter';
import { DeleteResult, InsertResult } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { generateSucessConfirmationPage } from 'src/shared/html/confirmation.page';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('insert')
  async insert(@Body() user: User): Promise<any> {
    const insertResult: InsertResult = await this.userService.insert(user);
    const userId = insertResult.identifiers[0].id;
    const mailResult = await this.mailService.sendConfirmationEmail(
      user.email,
      userId,
      user.name,
    );

    return { insertResult, ...mailResult };
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
    const mailResult = await this.mailService.sendConfirmationEmail(
      user.email,
      user.id,
      user.name,
    );
    return {
      user: user.username,
      email: user.email,
      status: 'Email changed',
      ...mailResult,
    };
  }

  @Get('confirmationEmail')
  async confirmationEmail(@Query('id') id: string) {
    const user: User = await this.userService.confirmationEmail(id);

    return generateSucessConfirmationPage(
      user.name,
      process.env.SAM_HOME,
      process.env.HEPHAESTHUS_SITE,
      process.env.HEPHAESTHUS_LOGO,
    );
  }

  @Get('getProfile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<object> {
    const { id } = req.user;
    return this.userService.getProfile(id);
  }
}
