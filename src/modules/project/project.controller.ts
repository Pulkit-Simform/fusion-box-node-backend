import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientAuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { User } from 'src/database/entities';

@Controller('project')
@UseGuards(ClientAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.create(createProjectDto);
    return {
      message: 'project created successfully!',
      data: {},
    };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const projects = await this.projectService.findAll(user);
    return {
      message: 'projects',
      data: {
        projects,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const project = await this.projectService.findOne(+id);
    if (!project) {
      throw new NotFoundException(`Project not found with id : ${id}`);
    }
    return {
      message: 'project',
      data: {
        project,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectService.update(+id, updateProjectDto);
    return {
      message: 'project updated successfully!',
      data: {
        project,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const project = await this.projectService.remove(+id);
    return {
      message: 'project removed successfully!',
      data: {},
    };
  }
}
