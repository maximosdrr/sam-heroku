import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entitys/doctor.entity';
import { Repository } from 'typeorm';
import { SqlErro } from '../../shared/interfaces/sql-erro.interface';
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
    return this.doctorRepository.insert(doctor).catch(erro => {
      throw new HttpException(
        'The insertion data contains errors, it was not possible to add',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findOneById(id: string): Promise<Doctor> {
    const doctor: Doctor = await this.doctorRepository.findOne(id);
    if (!doctor)
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);

    return doctor;
  }

  async findAll(limit: number, index: number): Promise<any> {
    if (!limit || !index)
      throw new HttpException(
        'Limit or index undefined',
        HttpStatus.BAD_REQUEST,
      );
    return this.doctorRepository
      .find({
        take: limit,
        skip: index,
      })
      .catch(erro => {
        throw new HttpException(
          'Internal Server Erro',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async delete(id: string): Promise<any> {
    return this.doctorRepository.delete(id);
  }

  async update(doctor: DoctorUpdateData): Promise<any> {
    const doctorToUpdate: Doctor = await this.doctorRepository.findOne(
      doctor.id,
    );
    if (!doctorToUpdate) {
      throw new HttpException(
        'The doctor with that id was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    doctorToUpdate.cmr = doctor.cmr;
    doctorToUpdate.name = doctor.name;
    doctorToUpdate.specialty = doctor.specialty;
    return this.doctorRepository.save(doctorToUpdate).catch(erro => {
      throw new HttpException('An error has occured', HttpStatus.BAD_REQUEST);
    });
  }
}
