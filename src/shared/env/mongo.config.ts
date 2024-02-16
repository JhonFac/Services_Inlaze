import { registerAs } from '@nestjs/config';
import { IsString, IsOptional } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

export class DatabaseConfigDto {
  @IsString()
  MONGODB_CLUSTER: string;

  @IsString()
  MONGODB_USER: string;

  @IsString()
  MONGODB_DATABASE: string;

  @IsString()
  MONGODB_AUTHSOURCE: string;

  @IsString()
  MONGODB_PASS: string;

  @IsString()
  MONGODB_PORT: string;

  @IsString()
  @IsOptional()
  PORT?: string;
}

export interface DatabaseConfig {
  cluster: string;
  user: string;
  database: string;
  authSource: string;
  password: string;
  dbPort: string;
  port: string;
}

export default registerAs('mongo', () => {
  const env = process.env;

  return {
    cluster: env.MONGODB_CLUSTER,
    user: env.MONGODB_USER,
    database: env.MONGODB_DATABASE,
    authSource: env.MONGODB_AUTHSOURCE,
    password: env.MONGODB_PASS,
    dbPort: env.MONGODB_PORT,
    port: env.PORT,
  };
});
