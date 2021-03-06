import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entitys/patient.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';
import { MedicalRecord } from './entitys/medical-record.entity';

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
          leftJoinAndSelect: {
            medicalRecord: 'patient.medicalRecord',
            appointment: 'patient.appointment',
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

  async findAllPatients(take: number, skip: number): Promise<Patient[]> {
    const calc = take + skip;
    if (!take || !skip)
      throw new HttpException(
        'Limit or index undefined',
        HttpStatus.BAD_REQUEST,
      );
    return (
      this.patientRepository
        // .createQueryBuilder('patient')
        // .orderBy({ name: 'ASC' })
        // .offset(skip * take)
        // .limit(take)
        // .leftJoinAndSelect('patient.medicalRecord', 'm')
        // .getMany()

        .find({
          take,
          skip: take * skip,
          order: { name: 'ASC' },
          join: {
            alias: 'patient',
            leftJoinAndSelect: {
              medicalRecord: 'patient.medicalRecord',
              appointment: 'patient.appointment',
            },
          },
        })
        .catch(erro => {
          throw new HttpException(erro, HttpStatus.BAD_REQUEST);
        })
    );
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
    patientToUpdate.sex = patient.sex;

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

  async findPatientByName(name: string): Promise<Patient> {
    const patient: Patient = await this.patientRepository
      .findOne({
        join: {
          alias: 'patient',
          leftJoinAndSelect: {
            medicalRecord: 'patient.medicalRecord',
            appointments: 'patient.appointment',
          },
        },
        where: {
          name: name,
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!patient)
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);

    return patient;
  }

  async getNumberOfPatients() {
    const result = await this.patientRepository.find().catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });

    return { total: result.length };
  }

  async findPatientLikeName(name: string) {
    const patients = await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.name like :name', { name: '%' + name + '%' })
      .leftJoinAndSelect('patient.medicalRecord', 'm')
      .leftJoinAndSelect('patient.appointment', 'a')
      .getMany()
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    return patients;
  }
}
