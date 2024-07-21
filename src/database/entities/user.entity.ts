import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { Skill } from './skill.entity';
import { Project } from './project.entity';
import { ChatHistory } from './chat.history.entity';
import { DSU } from './dsu.entity';

export enum departmentEnum {
  MEAN = 'MEAN',
  FLUTTER = 'FLUTTER',
  MERN = 'MERN',
  DEVOPS = 'DEVOPS',
  QA = 'QA',
  UIUX = 'UIUX',
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

  @Column({ select: false })
  @Exclude()
  public password: string;

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => ChatHistory, (skill) => skill.user)
  chat_history: ChatHistory[];

  @OneToMany(() => DSU, (dsu) => dsu.user)
  dsus: DSU[];

  @ManyToMany(() => Project, (project) => project.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'user_projects',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  projects?: Project[];
}
