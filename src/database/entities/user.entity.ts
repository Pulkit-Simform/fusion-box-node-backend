import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';

export enum departmentEnum {
  MEAN_STACK = 'MEAN_STACK',
  FLUTTER = 'FLUTTER',
}

@Entity('user')
export class User extends BaseEntity {
  @Column({ length: 255 })
  public full_name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public phone_number: string;

  @Column()
  public employee_code: number;

  @Column('date')
  public dob: Date;

  @Column()
  public designation: string;

  @Column()
  public department: string;

  @Column()
  @Exclude()
  public password: string;
}
