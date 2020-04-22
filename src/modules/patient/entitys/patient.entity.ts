import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedicalRecord } from './medical-record.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  healthInsurance: string;

  @Column({ unique: true })
  telephone: string;

  @Column()
  birthday: string;

  @OneToMany(
    type => MedicalRecord,
    hi => hi.patient,
  )
  medicalRecord: MedicalRecord;
}
