import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
  IsPhoneNumber,
  IsNumber
} from 'class-validator';
import { departmentEnum } from '../../../database/entities';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Full name of the user',
    default: 'John Doe',
  })
  @IsString()
  @MinLength(2)
  public full_name: string;

  @ApiProperty({
    type: String,
    description: 'email of the user',
    default: 'John.doe@email.com',
  })
  @IsString()
  @IsEmail()
  public email: string;


  @ApiProperty({
    type: String,
    description: 'phone number of the user',
  })
  @IsString()  
  public phone_number: string;

  @ApiProperty({
    type: Number,
    description: 'employee code of the user',
  })
  @IsNumber()
  public employee_code: number;

  @ApiProperty({
    type: Date,
    description: 'birthday date of the user',
    default: new Date(Date.now()),
  })
  @IsString()
  public dob: Date;


  @ApiProperty({
    type: String,
    description: 'designation of the user',    
  })
  @IsString()
  public designation: string;

  @ApiProperty({
    type: String,
    description: 'department of the user [MEAN_STACK,FLUTTER]',
    default: departmentEnum.FLUTTER,
  })
  @IsOptional()
  public department: departmentEnum;


  @ApiProperty({
    type: String,
    description: 'Password of the user, minimum length is 8',
    default: '***********',
  })
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  public password: string;

}
