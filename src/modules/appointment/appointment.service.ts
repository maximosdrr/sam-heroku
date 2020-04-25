import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entitys/appointment.entity';
import { Repository, InsertResult, DeleteResult } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appoitmentRepository: Repository<Appointment>,
  ) {}

  async insert(appoitment: Appointment): Promise<InsertResult> {
    return this.appoitmentRepository.insert(appoitment).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }

  async findOneById(id: string): Promise<Appointment> {
    const appointment: Appointment = await this.appoitmentRepository.findOne(
      id,
      {
        join: {
          alias: 'appointment',
          innerJoinAndSelect: {
            patient: 'appointment.patient',
            doctor: 'appointment.doctor',
          },
        },
      },
    );

    if (!appointment)
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);

    return appointment;
  }

  async findAll(limit: number, page: number): Promise<Appointment[]> {
    return this.appoitmentRepository
      .find({
        join: {
          alias: 'appointment',
          innerJoinAndSelect: {
            patient: 'appointment.patient',
            doctor: 'appointment.doctor',
          },
        },
        take: limit,
        skip: page,
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }

  async delete(id: string): Promise<DeleteResult> {
    const appointment: Appointment = await this.appoitmentRepository
      .findOne(id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!appointment)
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);

    return this.appoitmentRepository.delete(id);
  }

  async update(appointment): Promise<Appointment> {
    const appointmentToUpdate: Appointment = await this.appoitmentRepository
      .findOne(appointment.id)
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });

    if (!appointmentToUpdate)
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);

    appointmentToUpdate.date = appointment.date;
    appointmentToUpdate.description = appointment.description;
    appointmentToUpdate.doctor = appointment.doctor;

    return this.appoitmentRepository.save(appointmentToUpdate);
  }

  async;
}
