import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill, User } from 'src/database/entities';

@Injectable()
export class SkillService {
  constructor(@Inject('SKILL') private skillRepo: Repository<Skill>) {}

  async create(createSkillDto: CreateSkillDto, user: User) {
    const skill = this.skillRepo.create({
      ...createSkillDto,
      user,
    });
    return await this.skillRepo.save(skill);
  }

  async findAll(user: User) {
    return await this.skillRepo.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.skillRepo.findOneBy({ id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.findOne(id);
    if (!skill) {
      throw new NotFoundException('skill not found with this id');
    }
    Object.assign(skill, updateSkillDto);
    return this.skillRepo.save(skill);
  }

  async remove(id: number) {
    return await this.skillRepo.delete(id);
  }
}
