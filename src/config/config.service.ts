import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class ConfigService {
  private config: { [key: string]: any } = {};
  constructor() {
    this.config.env = process.env.NODE_ENV;
    this.config.servicePort = process.env.SERVICE_PORT;
    this.config.database = {
      DB_TYPE: process.env.DB_TYPE,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
    };
  }

  public get(key: string): any {
    return this.config[key];
  }
}
