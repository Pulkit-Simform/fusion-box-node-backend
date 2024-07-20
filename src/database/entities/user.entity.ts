import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("user")
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
  public department:string;
}
