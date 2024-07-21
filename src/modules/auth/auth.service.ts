import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { CreateUserDto, ResponseUserDto } from '../user/dto';
import { genSalt, hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from './dto';
import { message } from 'src/common/message';

export interface JWTPayload {
  id: number;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  private async createToken(payload: JWTPayload) {
    // signOptions Signature of token
    const signInOptions = {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    };

    const token = await sign(
      payload,
      this.configService.get('JWT_SECRET'),
      signInOptions,
    );

    return token;
  }

  async register(user: CreateUserDto): Promise<ResponseUserDto> {
    if (await this.userService.getUserByEmail(user.email))
      throw new BadRequestException(message.ERROR.SIGNUP.USER_EMAIL_EXISTS);

    if (await this.userService.getUserByPhoneNumber(user.phone_number))
      throw new BadRequestException(message.ERROR.SIGNUP.USER_PHONE_EXISTS);

    // if not then hash the password
    const salt = await genSalt(8);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;

    // Save the user in the database
    const userCreated = await this.userService.createUser(user);

    // create JWT token and send it to the response
    const token = await this.createToken({
      id: userCreated.id,
      email: user.email,
    });

    await this.userService.createSkillsForUser(userCreated, user.department);
    await this.userService.createDefaultChatHistoryForUser(userCreated);

    // return user and delete password
    return { ...userCreated, token: token };
  }

  async login(user: LoginUserDto): Promise<ResponseUserDto> {
    const availableUser = await this.userService.getUserByEmail(user.email);

    if (!availableUser)
      throw new BadRequestException(message.ERROR.AUTH.INVALID_CREDENTIALS);

    const checkPassword = await compare(user.password, availableUser.password);

    if (!checkPassword)
      throw new BadRequestException(message.ERROR.AUTH.INVALID_CREDENTIALS);

    const token = await this.createToken({
      id: availableUser.id,
      email: user.email,
    });

    return { ...availableUser, token: token } as ResponseUserDto;
  }
}
