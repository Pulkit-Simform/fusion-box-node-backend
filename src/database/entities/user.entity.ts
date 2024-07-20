import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { Skill } from './skill.entity';
import { Project } from './project.entity';

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

  @Column({ select: false })
  @Exclude()
  public password: string;

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

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
