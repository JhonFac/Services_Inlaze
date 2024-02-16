import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmsDto, CreateLogCodeCmsDto } from './dtos/create-cms.dto';
import { UpdateCmsDto } from './dtos/update-cms.dto';
import { CMS } from './schemas/cms.schema';
import { CMS_NOT_FOUND } from '../mapping/constants/mapping.constants';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCmsDto: CreateCmsDto) {
    const existingCms = await this.cmsService.findOneByUserId(
      createCmsDto.idUser,
    );
    if (existingCms) {
      return existingCms;
    }
    const createdCms = await this.cmsService.create(createCmsDto);
    return createdCms;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCms: UpdateCmsDto,
  ) {
    return this.cmsService.update(id, updateCms);
  }

  @Patch(':id/params')
  async updateCmsStatus(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCmsDto: UpdateCmsDto,
  ) {
    try {
      const cms = await this.findOneByUserId(id);
      return this.cmsService.update(cms._id, updateCmsDto);
    } catch (error) {
      throw new BadRequestException(CMS_NOT_FOUND);
    }
  }

  private ensureMaxLogLength(cms: CMS) {
    const MAX_LOG_LENGTH = 5;
    if (cms.logs.length >= MAX_LOG_LENGTH) {
      cms.logs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      cms.logs.shift();
    }
  }

  @Get()
  async findAll() {
    return this.cmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cmsService.findOne(id);
  }

  @Get(':id/idUser')
  async findOneByUserId(@Param('id') id: string) {
    const cms = await this.cmsService.findOneByUserId(id);
    if (!cms) throw new BadRequestException(CMS_NOT_FOUND);
    return cms;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cmsService.delete(id);
  }
}
