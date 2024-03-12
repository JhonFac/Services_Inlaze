import { registerAs } from "@nestjs/config";
import { IsString, IsOptional } from "class-validator";
import * as dotenv from "dotenv";
dotenv.config();

export class DatabaseConfigDto {
  @IsString()
  public MONGODB_CLUSTER!: string;

  @IsString()
  public MONGODB_USER!: string;

  @IsString()
  public MONGODB_DATABASE!: string;

  @IsString()
  public MONGODB_AUTHSOURCE!: string;

  @IsString()
  public MONGODB_PASS!: string;

  @IsString()
  public MONGODB_PORT!: string;

  @IsString()
  @IsOptional()
  public PORT?: string;
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

export default registerAs("mongo", () => {
  const env = process.env;

  return {
    cluster: env.MONGODB_CLUSTER ?? "default",
    user: env.MONGODB_USER ?? "default",
    database: env.MONGODB_DATABASE ?? "default",
    authSource: env.MONGODB_AUTHSOURCE ?? "default",
    password: env.MONGODB_PASS ?? "default",
    dbPort: env.MONGODB_PORT ?? "default",
    port: env.PORT ?? "default",
  };
});
