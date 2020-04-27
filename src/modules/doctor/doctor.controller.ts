import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Query,
  Get,
  UseFilters,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './entitys/doctor.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../../shared/http-exception/filter';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('insert')
  insert(@Body() doctor: Doctor): Promise<any> {
    return this.doctorService.insert(doctor);
  }

  @Put('update')
  update(@Body() doctor: Doctor): Promise<Doctor> {
    return this.doctorService.update(doctor);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<any> {
    return this.doctorService.delete(id);
  }

  @Get('findOneById')
  async findOneById(@Query('id') id: string): Promise<Doctor> {
    return this.doctorService.findOneById(id);
  }

  @Get('findAll')
  findAll(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<Doctor[]> {
    return this.doctorService.findAll(limit, page);
  }

  @Get('findDoctorByName')
  findDoctorByName(@Query('name') name: string): Promise<Doctor> {
    return this.doctorService.findDoctorByName(name);
  }

  @Get('findDoctorByCmr')
  findDoctorByCmr(@Query('cmr') cmr: string): Promise<Doctor> {
    return this.doctorService.findDoctorByCmr(cmr);
  }
}
