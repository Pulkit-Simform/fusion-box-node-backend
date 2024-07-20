import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('online_merchant')
export class Project extends BaseEntity {
  @Column({ nullable: false })
  brand_name: string;

  @Column({
    type: 'string',
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
