import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
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
    description: 'Password of the user, minimum length is 8',
    default: '***********',
  })
  @IsString()
  public password: string;
}
