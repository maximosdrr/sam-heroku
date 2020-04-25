import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entitys/patient.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { MedicalRecord } from './entitys/medical-record.entity';
import { HttpExceptionFilter } from 'src/shared/http-exception/filter';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(MedicalRecord)
    private medicalRecordRepository: Repository<MedicalRecord>,
  ) {}

  async insertPatient(patient: Patient): Promise<InsertResult> {
    return await this.patientRepository.insert(patient).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async insertMedicalRecord(
    medicalRecord: MedicalRecord,
  ): Promise<InsertResult> {
    return await this.medicalRecordRepository
      .insert(medicalRecord)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }

  async findPatientById(id: string): Promise<Patient> {
    const patient: Patient = await this.patientRepository
      .findOne(id, {
        join: {
          alias: 'patient',
          innerJoinAndSelect: {
            id: 'patient.medicalRecord',
          },
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!patient)
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);

    return patient;
  }

  async findAllPatients(limit: number, page: number): Promise<Patient[]> {
    if (!limit || !page)
      throw new HttpException(
        'Limit or index undefined',
        HttpStatus.BAD_REQUEST,
      );
    return this.patientRepository
      .find({
        take: limit,
        skip: page,
        join: {
          alias: 'patient',
          innerJoinAndSelect: {
            id: 'patient.medicalRecord',
          },
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }

  async deletePatient(id: string): Promise<DeleteResult> {
    return await this.patientRepository.delete(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteMedicalRecord(id: string): Promise<DeleteResult> {
    return await this.medicalRecordRepository.delete(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async updatePatient(patient: Patient): Promise<Patient> {
    const patientToUpdate: Patient = await this.patientRepository
      .findOne(patient.id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!patientToUpdate)
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);

    patientToUpdate.name = patient.name;
    patientToUpdate.birthday = patient.birthday;
    patientToUpdate.healthInsurance = patient.healthInsurance;
    patientToUpdate.medicalRecord = patient.medicalRecord;
    patientToUpdate.telephone = patient.telephone;

    return this.patientRepository.save(patientToUpdate).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async updateMedicalRecord(
    medicalRecord: MedicalRecord,
  ): Promise<MedicalRecord> {
    const patient: Patient = await this.patientRepository
      .findOne(medicalRecord.patient)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    const medicalRecordToUpdate: MedicalRecord = await this.medicalRecordRepository
      .findOne(medicalRecord.id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!patient)
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);

    if (!medicalRecordToUpdate)
      throw new HttpException('Medical record not found', HttpStatus.NOT_FOUND);

    medicalRecordToUpdate.description = medicalRecord.description;
    medicalRecordToUpdate.patient = medicalRecord.patient;

    return this.medicalRecordRepository
      .save(medicalRecordToUpdate)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }
}
