import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './entitys/doctor.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DoctorUpdateData } from './interfaces/doctor-update-data.interface';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('insert')
  insert(@Body() doctor: Doctor): Promise<any> {
    return this.doctorService.insert(doctor);
  }

  @Put('update')
  update(@Body() doctor: DoctorUpdateData): Promise<any> {
    return this.doctorService.update(doctor);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<any> {
    return this.doctorService.delete(id);
  }

  @Get('findOneById')
  findOneById(@Query('id') id: string): Promise<any> {
    return this.doctorService.findOneById(id);
  }

  @Get('findAll')
  findAll(
    @Query('limit') limit: number,
    @Query('page') index: number,
  ): Promise<any> {
    return this.doctorService.findAll(limit, index);
  }
}
