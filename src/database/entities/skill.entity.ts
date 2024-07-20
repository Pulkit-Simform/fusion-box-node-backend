import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity('skill')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    nullable: true,
  })
  user: number;

  @Column({
    nullable: true,
  })
  approvedBy: number;

  @Column({
    nullable: true,
  })
  rejectedBy: number;

  @Column({
    nullable: true,
  })
  commnet: string;
}
