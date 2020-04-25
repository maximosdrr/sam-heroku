import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Appointment } from 'src/modules/appointment/entitys/appointment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  accessLevel: number;

  @Column({ default: false })
  isChecked: boolean;

  @OneToMany(
    type => Appointment,
    appointment => appointment.user,
  )
  appointment: Appointment;
}
