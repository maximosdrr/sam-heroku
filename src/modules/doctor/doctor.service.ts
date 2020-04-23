import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entitys/doctor.entity';
import { Repository } from 'typeorm';
import { SqlErro } from '../user/interfaces/sql-erro.interface';
import { DoctorUpdateData } from './interfaces/doctor-update-data.interface';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  ) {}

  onSqlErro(erro) {
    const sqlErro: SqlErro = {
      name: erro.name,
      code: erro.code,
      errno: erro.errno,
    };
    return sqlErro;
  }

  async insert(doctor: Doctor): Promise<any> {
    return this.doctorRepository.insert(doctor).catch(this.onSqlErro);
  }

  async findOneById(id: string): Promise<any> {
    return this.doctorRepository.findOne(id).catch(this.onSqlErro);
  }

  async findAll(limit: number, index: number): Promise<any> {
    return this.doctorRepository
      .find({
        take: limit,
        skip: index,
      })
      .catch(this.onSqlErro);
  }

  async delete(id: string): Promise<any> {
    return this.doctorRepository.delete(id);
  }

  async update(doctor: DoctorUpdateData): Promise<any> {
    const doctorToUpdate: Doctor = await this.doctorRepository.findOne(
      doctor.id,
    );
    if (!doctor) return { erro: `${doctor.id} not found in your database` };
    doctorToUpdate.cmr = doctor.cmr;
    doctorToUpdate.name = doctor.name;
    doctorToUpdate.specialty = doctor.specialty;
    return this.doctorRepository.save(doctorToUpdate).catch(this.onSqlErro);
  }
}
