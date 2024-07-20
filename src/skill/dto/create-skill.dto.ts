import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ELevel, EStatus } from 'src/database/entities';

export class CreateSkillDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  skill: string;

  @ApiProperty({
    type: ELevel,
  })
  @IsEnum(ELevel)
  @IsNotEmpty()
  level: ELevel;

  @ApiProperty({
    type: EStatus,
  })
  @IsEnum(EStatus)
  @IsNotEmpty()
  status: EStatus;
}
