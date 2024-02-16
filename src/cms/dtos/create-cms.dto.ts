import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CmsStatus } from '../schemas/cms.schema';

export class CreateLogCodeCmsDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
}

export class CreateCmsDto {
  @IsNotEmpty()
  @IsString()
  idUser: string;

  @IsNotEmpty()
  @IsString()
  currentCode: string;

  @IsEnum(CmsStatus)
  @IsOptional()
  status?: CmsStatus;

  @IsNotEmpty()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLogCodeCmsDto)
  logs: CreateLogCodeCmsDto;
}
