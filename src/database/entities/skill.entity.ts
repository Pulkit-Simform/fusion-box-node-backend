import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum ELevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export enum EStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum EType {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

@Entity('skill')
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EType,
    default: EType.PRIMARY,
  })
  stype: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column({
    type: 'enum',
    enum: ELevel,
    default: ELevel.BEGINNER,
  })
  level: ELevel;

  @Column()
  skill: string;

  @Column({
    type: 'enum',
    enum: EStatus,
    default: EStatus.PENDING,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.skills)
  user: User;

  @Column()
  @OneToOne(() => User, { nullable: true })
  approvedBy: number;

  @Column()
  @OneToOne(() => User, { nullable: true })
  rejectedBy: number;

  @Column({
    nullable: true,
  })
  comment: string;
}
