import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { CmsStatus } from "../schemas/cms.schema";

export class UpdateCmsDto {
  @ApiProperty({
    description: "El nuevo código actual",
    example: "nuevo código",
  })
  @IsNotEmpty()
  @IsString()
  public currentCode!: string;

  @ApiProperty({
    description: "El nuevo estado del CMS",
    enum: CmsStatus,
    example: "START",
  })
  @IsOptional()
  @IsEnum(CmsStatus)
  public status?: CmsStatus;
}
