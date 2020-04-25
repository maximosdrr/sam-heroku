import {
  Controller,
  Body,
  Post,
  Get,
  Query,
  UseGuards,
  UseFilters,
  Delete,
  Put,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './entitys/patient.entity';
import { InsertResult, DeleteResult } from 'typeorm';
import { MedicalRecord } from './entitys/medical-record.entity';
import { HttpExceptionFilter } from 'src/shared/http-exception/filter';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patient')
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('insert')
  insert(@Body() patient: Patient): Promise<InsertResult> {
    return this.patientService.insertPatient(patient);
  }

  @Post('medical-record/insert')
  insertMedicalRecord(
    @Body() medicalRecord: MedicalRecord,
  ): Promise<InsertResult> {
    return this.patientService.insertMedicalRecord(medicalRecord);
  }

  @Get('findOneById')
  findOneById(@Query('id') id: string): Promise<Patient> {
    return this.patientService.findPatientById(id);
  }

  @Get('findAll')
  findAll(@Query('limit') limit, @Query('page') page): Promise<Patient[]> {
    return this.patientService.findAllPatients(limit, page);
  }

  @Get('findPatientByName')
  findPatientByName(@Query('name') name: string) {
    return this.patientService.findPatientByName(name);
  }

  @Delete('delete')
  delete(@Query('id') id: string): Promise<DeleteResult> {
    return this.patientService.deletePatient(id);
  }

  @Delete('medical-record/delete')
  deleteMedicalRecord(@Query('id') id: string): Promise<DeleteResult> {
    return this.patientService.deleteMedicalRecord(id);
  }

  @Put('update')
  update(@Body() patient: Patient): Promise<Patient> {
    return this.patientService.updatePatient(patient);
  }

  @Put('medical-record/update')
  updateMedicalRecord(
    @Body() medicalRecord: MedicalRecord,
  ): Promise<MedicalRecord> {
    return this.patientService.updateMedicalRecord(medicalRecord);
  }
}
