import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Repository } from 'typeorm';
import { Skill } from 'src/database/entities';

@Injectable()
export class SkillService {

  constructor(@Inject('SKILL') private skillRepo: Repository<Skill>){

  }

  async create(createSkillDto: CreateSkillDto) {
    const skill =  this.skillRepo.create({
      ...createSkillDto
    });
    return this.skillRepo.save(skill);
  }

  findAll(skip: number, take: number) {
    return this.skillRepo.find({ skip, take });
  }

  findOne(id: number) {
    return this.skillRepo.findOneBy({
      id,
    });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.findOne(id);
    if(!skill){
      throw new NotFoundException("skill not found with this id");
    }
    Object.assign(skill,updateSkillDto);
    return this.skillRepo.save(skill);
  }

  remove(id: number) {
    return this.skillRepo.delete(id);
  }
}
