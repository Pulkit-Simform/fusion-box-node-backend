import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDsuDto } from './dto/create-dsu.dto';
import { UpdateDsuDto } from './dto/update-dsu.dto';
import { Project, User } from 'src/database/entities';
import { In, Repository } from 'typeorm';
import { DSU } from 'src/database/entities/dsu.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class DsuService {
  constructor(
    @Inject('DSU') private dsuRepo: Repository<DSU>,
    private projectService: ProjectService,
  ) {}

  async create(createDsuDto: CreateDsuDto, user: User) {
    const project = await this.projectService.findOneFilter({
      relations: ['users'],
      where: {
        id: createDsuDto.project,
        users: {
          id: user.id,
        },
      },
    });
    if (!project) {
      throw new BadRequestException('No Project found with this id!');
    }
    const dsu = this.dsuRepo.create({
      ...createDsuDto,
      user: user,
      project: project,
    });
    return this.dsuRepo.save(dsu);
  }

  async findAll(page: number, user: User, projectId?: number) {
    let projects: Project | Project[];
    if (projectId) {
      projects = await this.projectService.findOneFilter({
        relations: ['users'],
        where: {
          id: projectId,
          users: {
            id: user.id,
          },
        },
      });
      if (!projects) {
        throw new BadRequestException('no project found with this id!');
      }
    } else {
      projects = await this.projectService.findAll(user);
    }

    let projectIds: number[];
    if (Array.isArray(projects)) {
      projectIds = projects.map((project) => project.id);
    } else {
      projectIds = [projects.id];
    }

    const pageSize = 20;
    const [data, totalCount] = await this.dsuRepo.findAndCount({
      relations: ['project', 'user'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        project: In(projectIds),
      },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return {
      dsu: data,
      totalCount,
      hasNextPage,
      hasPrevPage,
    };
  }

  findOne(id: number) {
    return this.dsuRepo.findOne({
      relations: ['project', 'user'],
      where: {
        id,
      },
    });
  }

  async update(id: number, updateDsuDto: UpdateDsuDto) {
    const dsu = await this.dsuRepo.findOne({
      where: {
        id,
      },
    });
    if (!dsu) {
      throw new NotFoundException('No dsu found with this id');
    }
    Object.assign(dsu, updateDsuDto);
    return this.dsuRepo.save(dsu);
  }

  async remove(id: number) {
    const dsu = await this.dsuRepo.findOne({
      where: {
        id,
      },
    });
    if (!dsu) {
      throw new NotFoundException('No dsu found with this id');
    }
    return this.dsuRepo.remove(dsu);
  }
}
