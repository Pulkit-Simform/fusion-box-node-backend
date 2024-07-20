import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('online_merchant')
export class OnlineMerchant extends BaseEntity {
  @Column({ nullable: false })
  brand_name: string;

  @Column({
    comment: 'comma separated city values or single value',
  })
  available_at: string;

  @Column()
  category: string;

  @Column()
  medium: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'boolean', nullable: false })
  restro_pass: boolean;
}
