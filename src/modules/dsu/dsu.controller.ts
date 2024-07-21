import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { DsuService } from './dsu.service';
import { CreateDsuDto } from './dto/create-dsu.dto';
import { UpdateDsuDto } from './dto/update-dsu.dto';
import { ClientAuthGuard } from 'src/core/guards/auth.guard';
import { CurrentUser } from 'src/core/decorators/user.decorator';
import { User } from 'src/database/entities';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Tags } from 'src/common/constant';
import { message } from 'src/common/message';

@ApiTags(Tags.DSU)
@Controller('dsu')
@ApiBearerAuth()
@UseGuards(ClientAuthGuard)
export class DsuController {
  constructor(private readonly dsuService: DsuService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createDsuDto: CreateDsuDto,
    @CurrentUser() user: User,
  ) {
    const dsu = await this.dsuService.create(createDsuDto, user);
    return {
      message: message.DSU.SUCCESS.CREATED,
      data: {
        dsu,
      },
    };
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'projectId', type: Number, required: false })
  async findAll(
    @CurrentUser() user: User,
    @Query('page') page: number,
    @Query('projectId') projectId?: number,
  ) {
    const dsus = await this.dsuService.findAll(page || 1, user, projectId);
    return {
      message: message.DSU.SUCCESS.SINGLE_DSU,
      data: dsus,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const dsu = await this.dsuService.findOne(+id);
    return {
      message: message.DSU.SUCCESS.SINGLE_DSU,
      data: {
        dsu,
      },
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDsuDto: UpdateDsuDto) {
    const dsu = await this.dsuService.update(+id, updateDsuDto);
    return {
      message: message.DSU.SUCCESS.UPDATED,
      data: {
        dsu,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const dsu = await this.dsuService.remove(+id);
    return {
      message: message.DSU.SUCCESS.DELETED,
      data: {
        dsu,
      },
    };
  }
}
