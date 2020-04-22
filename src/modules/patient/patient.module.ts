import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entitys/patient.entity';
import { MedicalRecord } from './entitys/medical-record.entity';

@Module({
  providers: [PatientService],
  controllers: [PatientController],
  imports: [TypeOrmModule.forFeature([Patient, MedicalRecord])],
})
export class PatientModule {}
