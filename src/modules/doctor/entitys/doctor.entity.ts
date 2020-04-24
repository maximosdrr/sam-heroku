import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
