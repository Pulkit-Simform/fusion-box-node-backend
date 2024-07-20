import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamptz',
      nullable: true,
    })
    updatedAt: Date;
  
    @DeleteDateColumn({
      type: 'timestamptz',
      nullable: true,
    })
    deletedAt: Date;
  }
  