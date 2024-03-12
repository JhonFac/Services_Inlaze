import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Delete,
  Param,
  BadRequestException,
  Patch,
} from "@nestjs/common";
import { CmsService } from "./cms.service";
import { CreateCmsDto, CreateLogCodeCmsDto } from "./dtos/create-cms.dto";
import { UpdateCmsDto } from "./dtos/update-cms.dto";
import type { CMS } from "./schemas/cms.schema";
import { CMS_NOT_FOUND } from "../mapping/constants/mapping.constants";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("CMS")
@Controller("cms")
export class CmsController {
  public constructor(private readonly cmsService: CmsService) {}

  @Get()
  public async findAll(): Promise<CMS[]> {
    return this.cmsService.findAll();
  }

  @Get(":id")
  public async findOne(@Param("id") id: string): Promise<CMS | null> {
    const cms = await this.cmsService.findOne(id);
    if (cms === null) throw new BadRequestException(CMS_NOT_FOUND);
    return cms;
  }

  @Get(":id/idUser")
  public async findOneByUserId(@Param("id") id: string): Promise<CMS | null> {
    return this.cmsService.validateUserId(id);
  }

  @Post()
  public async create(@Body(new ValidationPipe()) createCmsDto: CreateCmsDto): Promise<CMS | null> {
    const existingCms = await this.cmsService.findOneByUserId(createCmsDto.idUser);
    if (existingCms) return existingCms;
    return this.cmsService.create(createCmsDto);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updateCmsDto: UpdateCmsDto,
  ): Promise<CMS | null> {
    const cms = await this.cmsService.validateUserId(id);
    return this.cmsService.update(String(cms._id), updateCmsDto);
  }

  @Patch(":id/logs")
  public async addLogToCms(
    @Param("id") id: string,
    @Body(new ValidationPipe()) createLogCodeCmsDto: CreateLogCodeCmsDto,
  ): Promise<CMS | null> {
    return this.cmsService.updateLogToCms(id, createLogCodeCmsDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: string): Promise<CMS | null> {
    const cms = await this.cmsService.validateUserId(id);
    return this.cmsService.delete(String(cms._id));
  }
}
