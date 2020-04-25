import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { type } from 'os';
import { Appointment } from 'src/modules/appointment/entitys/appointment.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  cmr: string;

  @Column()
  specialty: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(
    type => Appointment,
    appointment => appointment.doctor,
  )
  appointment: Appointment;
}
