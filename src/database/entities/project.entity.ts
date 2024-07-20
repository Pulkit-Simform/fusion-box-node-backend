import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Project')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
