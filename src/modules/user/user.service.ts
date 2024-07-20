import { Inject, Injectable } from '@nestjs/common';
import { User } from './../../database/entities';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
@Injectable()
export class UserService {
  constructor(
    @Inject("USER") private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUsersById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async getUserByIds(ids: number[]): Promise<User[]>{
    return this.userRepository.find({
      where: {
        id: In(ids)
      }
    })
  }

  async getUsersByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
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
