import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class ConfigService {
  private config: { [key: string]: any } = {};
  constructor() {
    this.config.env = process.env.NODE_ENV;
    this.config.servicePort = process.env.SERVICE_PORT;
    this.config.openAIKey = process.env.OPEN_AI_KEY;
    this.config.database = {
      DB_TYPE: process.env.DB_TYPE,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
      DB_READ_ONLY_USER: process.env.DB_READ_ONLY_USER,
      DB_READ_ONLY_PASSWORD: process.env.DB_READ_ONLY_PASSWORD,
    };
  }

  public get(key: string): any {
    return this.config[key];
  }
}
