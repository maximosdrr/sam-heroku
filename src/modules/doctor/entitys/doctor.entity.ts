import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cmr: string;

  @Column()
  specialty: string;

  @Column()
  name: string;
}
