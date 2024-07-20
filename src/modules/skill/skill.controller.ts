import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    const skill = await this.skillService.create(createSkillDto);
    return {
      message: 'skill has been created Successfully!',
      data: {
        skill,
      },
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  async findAll() {
    const skills = await this.skillService.findAll(0, 10);
    return {
      message: 'skills',
      data: {
        skills,
      },
    };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const skill = await this.skillService.findOne(+id);
    if (!skill) {
      throw new NotFoundException('skill not found with this id');
    }
    return {
      message: 'skills',
      data: {
        skill,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    const skill = await this.skillService.update(+id, updateSkillDto);
    return {
      message: 'skills updated',
      data: {
        skill,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const skill = await this.skillService.remove(+id);
    if (!skill) {
      throw new NotFoundException('skill not found with this id');
    }
    return {
      message: 'skill deleted sucessfully!',
      data: {},
    };
  }
}
