import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ChatMessage } from 'src/core/interfaces/chatHistory';

export enum QueryType {
  DOC = 'document',
  DB = 'database',
}

@Entity('chat_history')
export class ChatHistory extends BaseEntity {
  @Column({ type: 'enum', enum: QueryType })
  public query_type: QueryType;

  @Column({
    type: 'json',
    nullable: false,
    default: '[]',
  })
  public messages: ChatMessage[];

  @ManyToOne(() => User, (user) => user.chat_history)
  user: User;
}
