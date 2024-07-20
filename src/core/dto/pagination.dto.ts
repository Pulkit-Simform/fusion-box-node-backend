import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { message } from 'src/common/message';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @ApiPropertyOptional({ description: 'page number' })
  @IsNotEmpty({ message: message.VALIDATION.NOT_EMPTY('page') })
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'limit per page' })
  @IsNotEmpty({ message: message.VALIDATION.NOT_EMPTY('limit') })
  @IsOptional()
  @Transform(({ value }) => +value)
  limit: number;

  @ApiPropertyOptional({ description: 'search keyword', default: null })
  @IsNotEmpty({ message: message.VALIDATION.NOT_EMPTY('search') })
  @IsOptional()
  search: string = null;

  @ApiPropertyOptional({ description: 'column name to sort on', default: null })
  @IsNotEmpty({ message: message.VALIDATION.NOT_EMPTY('sortOn') })
  @IsOptional()
  sortOn: string;

  @ApiPropertyOptional({
    description: 'sorting order of the column',
    enum: OrderBy,
  })
  @IsNotEmpty({ message: message.VALIDATION.NOT_EMPTY('sortBy') })
  @IsEnum(OrderBy)
  @IsOptional()
  @Transform((v) => v.value.toUpperCase())
  sortBy: OrderBy;
}
