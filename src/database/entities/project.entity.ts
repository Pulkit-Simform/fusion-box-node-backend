import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { DSU } from './dsu.entity';

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

  @OneToMany(() => DSU, (dsu) => dsu.project)
  dsus: DSU[];

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
