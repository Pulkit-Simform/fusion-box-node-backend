import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Project, User } from 'src/database/entities';
import { UserService } from '../user/user.service';
import { message } from 'src/common/message';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT') private projectRepo: Repository<Project>,
    private readonly userService: UserService,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    const users = await this.userService.getUserByIds(createProjectDto.users);
    const createUserBody = {
      ...createProjectDto,
      users,
    };
    const project = this.projectRepo.create(createUserBody);
    return this.projectRepo.save(project);
  }

  async findAll(user: User) {
    return this.projectRepo.find({
      relations: ['users'],
      where: {
        users: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.projectRepo.findOneBy({ id });
  }

  async findOneFilter(filters: FindOneOptions<Partial<Project>>) {
    return this.projectRepo.findOne(filters);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(message.PROJECT.ERROR.NOT_FOUND);
    }
    Object.assign(project, updateProjectDto);
    return this.projectRepo.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(message.PROJECT.ERROR.NOT_FOUND);
    }
    return this.projectRepo.remove(project);
  }
}
