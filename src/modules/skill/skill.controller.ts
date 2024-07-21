import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Public } from 'src/core/decorators/public.decorator';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { EType, User } from 'src/database/entities';
import { ClientAuthGuard } from 'src/core/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tags } from 'src/common/constant';
import { message } from 'src/common/message';

@ApiTags(Tags.SKILL)
@Controller('skill')
@UseGuards(ClientAuthGuard)
@ApiBearerAuth()
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createSkillDto: CreateSkillDto,
    @CurrentUser() user: User,
  ) {
    createSkillDto.stype = EType.SECONDARY;
    const skill = await this.skillService.create(createSkillDto, user);
    return {
      message: message.SKILL.SUCCESS.CREATED,
      data: {
        skill,
      },
    };
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    const skills = await this.skillService.findAll(user);
    return {
      message: message.SKILL.SUCCESS.SINGLE_PROJECT,
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
      throw new NotFoundException(message.SKILL.ERROR.NOT_FOUND);
    }
    return {
      message: message.SKILL.SUCCESS.SINGLE_PROJECT,
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
      message: message.SKILL.SUCCESS.UPDATED,
      data: {
        skill,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const skill = await this.skillService.remove(+id);
    return {
      message: message.SKILL.SUCCESS.DELETED,
      data: {},
    };
  }
}
