import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from 'src/database/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {

  constructor(@Inject("PROJECT") private projectRepo: Repository<Project>, private readonly userService: UserService){

  }
  async create(createProjectDto: CreateProjectDto) {
    const users = await this.userService.getUserByIds(createProjectDto.users);
    const createUserBody = {
      ...createProjectDto,
      users
    }
    const project = this.projectRepo.create(createUserBody);
    return this.projectRepo.save(project);
  }

  findAll(take: number=10,skip: number=0) {
    return this.projectRepo.find({take,skip});
  }

  findOne(id: number) {
    return this.projectRepo.findOneBy({id});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if(!project){
      throw new NotFoundException(`Project not found with id: ${id}`);
    }
    Object.assign(project,updateProjectDto);
    return this.projectRepo.save(project);
  }

 async remove(id: number) {
    const project = await this.findOne(id);
    if(!project){
      throw new NotFoundException(`Project not found with id: ${id}`);
    }
    return this.projectRepo.remove(project);
  }
}
