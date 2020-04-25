import {
  Controller,
  Post,
  Req,
  UseFilters,
  Body,
  UseGuards,
  Get,
  Query,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { InsertResult, DeleteResult } from 'typeorm';
import { HttpExceptionFilter } from 'src/shared/http-exception/filter';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entitys/appointment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('appointment')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('insert')
  insert(@Req() req, @Body() appointment: Appointment): Promise<InsertResult> {
    const { id } = req.user;
    appointment.user = id;
    return this.appointmentService.insert(appointment);
  }

  @Get('findOneById')
  findOneById(@Query('id') id: string): Promise<Appointment> {
    return this.appointmentService.findOneById(id);
  }

  @Get('findAll')
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Appointment[]> {
    if (!limit || !page)
      throw new HttpException(
        'Limit or Page queries not provided in your url',
        HttpStatus.BAD_REQUEST,
      );
    return this.appointmentService.findAll(limit, page);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.appointmentService.delete(id);
  }

  @Put('Update')
  update(@Body() appointment): Promise<Appointment> {
    return this.appointmentService.update(appointment);
  }
}
