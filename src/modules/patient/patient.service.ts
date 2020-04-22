import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entitys/patient.entity';
import { Repository, InsertResult } from 'typeorm';
import { MedicalRecord } from './entitys/medical-record.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
  ) {}

  async insertPatient(patient: Patient): Promise<InsertResult> {
    return await this.patientRepository.insert(patient);
  }

  async insertMedicalRecord(
    medicalRecord: MedicalRecord,
  ): Promise<InsertResult> {
    return await this.medicalRecordRepository.insert(medicalRecord);
  }

  async findPatientById(id: string): Promise<Patient> {
    return await this.patientRepository.findOne(id, {
      join: {
        alias: 'patient',
        innerJoinAndSelect: {
          id: 'patient.medicalRecord',
        },
      },
    });
  }
}
