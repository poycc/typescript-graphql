import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('crm_user')
export default class CrmUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
