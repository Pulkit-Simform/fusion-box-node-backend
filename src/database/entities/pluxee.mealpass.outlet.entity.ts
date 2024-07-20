import {  Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('meal_pass_outlet')
export class MealPassOutlet extends BaseEntity {
  @Column({ nullable: false })
  outlet_name: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  area: string;

  @Column()
  city: string;

  @Column({ type: 'number' })
  pincode: number;

  @Column()
  state: string;

  @Column()
  new_category: string;

  @Column({ type: 'boolean', nullable: false })
  enable_with_bqr_code: boolean;
}
