import { BaseEntity, Entity } from 'typeorm';

export class UserStatusUpdate extends BaseEntity {
  id: number;
  description: string;
  user: number;
  project: number;
}
