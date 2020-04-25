import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Patient } from 'src/modules/patient/entitys/patient.entity';
import { Doctor } from 'src/modules/doctor/entitys/doctor.entity';
import { User } from 'src/modules/user/entitys/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  date: Date;

  @Column({
    type: 'longtext',
    nullable: true,
    default: 'No description provided',
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
