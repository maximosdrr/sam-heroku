import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    accessLevel: number;

    @Column()
    isChecked: boolean;
}
