import { ConfigService, ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});
const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '../../**/**/*entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
};

export default databaseConfig;
