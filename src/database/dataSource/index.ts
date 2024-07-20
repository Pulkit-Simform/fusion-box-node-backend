import { ConfigService } from 'src/config/config.service';
import { DataSource } from 'typeorm';
import { join } from 'path';

const configService = new ConfigService();
const dbConfig = configService.get('database');

export default new DataSource({
  name: 'postgres',
  type: dbConfig.DB_TYPE,
  host: dbConfig.DB_HOST,
  port: +dbConfig.DB_PORT,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  synchronize: true,
  entities: [join(__dirname, '../entities/*.{ts,js}')],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  logging: true,
  migrationsTableName: 'migrations',
});
