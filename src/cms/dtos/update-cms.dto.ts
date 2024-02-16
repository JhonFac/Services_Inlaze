import { IsEnum, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CmsStatus } from '../schemas/cms.schema';

export class UpdateCmsDto {
  @IsNotEmpty()
  @IsString()
  currentCode: string;

  @IsOptional()
  @IsEnum(CmsStatus)
  status?: CmsStatus;
}
