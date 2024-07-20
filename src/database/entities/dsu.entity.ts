import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('dsu')
export class DSU extends BaseEntity {
  @ManyToOne(() => User, (user) => user.dsus)
  user: User;

  @ManyToOne(() => Project, (project) => project.dsus)
  project: Project;

  @Column({
    type: 'timestamp',
  })
  postDate: Date;

  @Column()
  blockers: string;

  @Column()
  todayUpdate: string;

  @Column()
  tomorrowWork: string;
}
