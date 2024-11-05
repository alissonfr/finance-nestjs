import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true})
  email: string;

  @Column({ nullable: false, unique: true})
  cpf: string;

  @Column({ nullable: false })
  password: string;
}