import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    type => Patient,
    p => p.medicalRecord,
    { onDelete: 'CASCADE' },
  )
  patient: Patient;

  @Column({ type: 'longtext', default: 'Sem dados até o momento' })
  descrition: string;
}
