import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Patient } from '../../patient/entitys/patient.entity';
import { Doctor } from '../../doctor/entitys/doctor.entity';
import { User } from '../../user/entitys/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  date: Date;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  description: string;

  @ManyToOne(
    type => Patient,
    patient => patient.appointment,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  patient: Patient;

  @ManyToOne(
    type => Doctor,
    doctor => doctor.appointment,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  doctor: Doctor;

  @ManyToOne(
    type => User,
    user => user.appointment,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;
}
