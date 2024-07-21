import { PartialType } from '@nestjs/swagger';
import { CreateDsuDto } from './create-dsu.dto';

export class UpdateDsuDto extends PartialType(CreateDsuDto) {}
