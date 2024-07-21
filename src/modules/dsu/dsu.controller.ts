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
      message: 'DSU created',
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
    console.log('projectId', projectId);
    const dsus = await this.dsuService.findAll(page || 1, user, projectId);
    return {
      message: 'dsu',
      data: dsus,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dsuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDsuDto: UpdateDsuDto) {
    return this.dsuService.update(+id, updateDsuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dsuService.remove(+id);
  }
}
