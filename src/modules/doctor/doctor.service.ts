import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entitys/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  ) {}

  async insert(doctor: Doctor): Promise<any> {
    return this.doctorRepository.insert(doctor).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async findOneById(id: string): Promise<Doctor> {
    const doctor: Doctor = await this.doctorRepository
      .findOne(id, {
        join: {
          alias: 'doctor',
          leftJoinAndSelect: {
            appointment: 'doctor.appointment',
          },
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
    if (!doctor)
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);

    return doctor;
  }

  async findAll(limit: number, page: number): Promise<any> {
    if (!limit || !page)
      throw new HttpException(
        'Limit or index undefined',
        HttpStatus.BAD_REQUEST,
      );
    return this.doctorRepository
      .find({
        take: limit,
        skip: page,
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }

  async delete(id: string): Promise<any> {
    return this.doctorRepository.delete(id).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async update(doctor: Doctor): Promise<any> {
    const doctorToUpdate: Doctor = await this.doctorRepository
      .findOne(doctor.id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
    if (!doctorToUpdate) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    doctorToUpdate.cmr = doctor.cmr;
    doctorToUpdate.name = doctor.name;
    doctorToUpdate.specialty = doctor.specialty;
    return this.doctorRepository.save(doctorToUpdate).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async findDoctorByName(name: string): Promise<Doctor> {
    const doctor = await this.doctorRepository
      .findOne({
        join: {
          alias: 'doctor',
          leftJoinAndSelect: {
            appointment: 'doctor.appointment',
          },
        },
        where: {
          name: name,
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!doctor)
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);

    return doctor;
  }

  async findDoctorByCmr(cmr: string): Promise<Doctor> {
    const doctor = await this.doctorRepository
      .findOne({
        join: {
          alias: 'doctor',
          leftJoinAndSelect: {
            appointment: 'doctor.appointment',
          },
        },
        where: {
          cmr: cmr,
        },
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!doctor)
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);

    return doctor;
  }
}
