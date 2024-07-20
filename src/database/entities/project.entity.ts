import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('project')
export class Project extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToMany(() => User, (users) => users.projects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  users: User[];

  @Column({
    type: 'date',
  })
  startDate: Date;

  @Column({
    type: 'date',
  })
  endDate: Date;

  @Column()
  clientName: string;

  @Column()
  progress: number;
}
