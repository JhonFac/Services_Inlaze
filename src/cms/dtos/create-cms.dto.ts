import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsOptional, ValidateNested, IsDate } from "class-validator";
import { Type } from "class-transformer";
import { CmsStatus } from "../schemas/cms.schema";

export class CreateLogCodeCmsDto {
  @ApiProperty({ description: "El código", example: "codigo" })
  @IsNotEmpty()
  @IsString()
  public code!: string;

  @ApiProperty({
    description: "La fecha de creación",
    example: "2024-02-16T12:00:00Z",
  })
  @IsOptional()
  @IsDate()
  public createdAt?: Date;
}

export class CreateCmsDto {
  @ApiProperty({ description: "El ID del usuario", example: "123" })
  @IsNotEmpty()
  @IsString()
  public idUser!: string;

  @ApiProperty({ description: "El código actual", example: "codigo actual" })
  @IsNotEmpty()
  @IsString()
  public currentCode!: string;

  @ApiProperty({
    description: "El estado del CMS",
    enum: CmsStatus,
    example: "START",
  })
  @IsEnum(CmsStatus)
  @IsOptional()
  public status?: CmsStatus;

  @ApiProperty({ description: "Los registros de códigos de log" })
  @IsNotEmpty()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLogCodeCmsDto)
  public logs!: CreateLogCodeCmsDto;
}
