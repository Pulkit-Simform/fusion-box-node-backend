import { Inject, Injectable } from '@nestjs/common';
import { Skill, User } from './../../database/entities';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { getSkillsByDepartment } from 'src/common/constant';
import {
  ChatHistory,
  QueryType,
} from 'src/database/entities/chat.history.entity';
import { logger } from 'src/utils/logger.service';
import { handleError } from 'src/utils/handle.error';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER') private readonly userRepository: Repository<User>,
    @Inject('SKILL') private readonly skillRepo: Repository<Skill>,
    @Inject('CHAT_HISTORY')
    private readonly chatHistoryRepository: Repository<ChatHistory>,
  ) {}

  async createSkillsForUser(user: User, department: string) {
    const skills = this.skillRepo.create(
      getSkillsByDepartment(department, user.id),
    );
    return this.skillRepo.insert(skills);
  }

  async createDefaultChatHistoryForUser(user: User) {
    try {
      await this.chatHistoryRepository.save({ query_type: QueryType.DB, user });
      await this.chatHistoryRepository.save({
        query_type: QueryType.DOC,
        user,
      });
    } catch (error) {
      logger.error('Error while creating default chat history', { error });
      handleError(error);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUsersById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async getUserByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        phone_number: phoneNumber,
      },
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    const user = await this.getUsersById(id);
    if (user) {
      Object.assign(user, data);
      return this.userRepository.save(user);
    }

    return null;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const createdUser = await this.userRepository.create(user);
    await this.userRepository.save(createdUser);
    return createdUser;
  }
}
