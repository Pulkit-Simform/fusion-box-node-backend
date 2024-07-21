import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ELevel, EStatus, EType } from 'src/database/entities';

export class CreateSkillDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  skill: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    type: String,
  })
  @IsEnum(ELevel)
  @IsNotEmpty()
  level: ELevel;

  @ApiProperty({
    type: String,
  })
  @IsEnum(EStatus)
  @IsNotEmpty()
  status: EStatus;

  @ApiProperty({
    type: String
  })
  @IsEnum(EType)
  @IsOptional()
  stype: EType;
}
