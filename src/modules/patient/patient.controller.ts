import { Controller, Body, Post, Get, Query, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './entitys/patient.entity';
import { InsertResult } from 'typeorm';
import { MedicalRecord } from './entitys/medical-record.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('insert')
  insert(@Body() patient: Patient): Promise<InsertResult> {
    return this.patientService.insertPatient(patient);
  }

  @Post('insert-medical-record')
  insertMedicalRecord(
    @Body() medicalRecord: MedicalRecord,
  ): Promise<InsertResult> {
    return this.patientService.insertMedicalRecord(medicalRecord);
  }

  @Get('findOneById')
  findOneById(@Query('id') id: string): Promise<Patient> {
    return this.patientService.findPatientById(id);
  }
}
