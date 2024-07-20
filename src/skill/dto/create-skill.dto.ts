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
}
