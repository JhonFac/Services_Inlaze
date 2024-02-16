import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogCodeCms } from './schemas/log.cms.schema';
import { CMS } from './schemas/cms.schema';
import { CreateCmsDto, CreateLogCodeCmsDto } from './dtos/create-cms.dto';

@Injectable()
export class CmsService {
  constructor(@InjectModel(CMS.name) private cmsModel: Model<CMS>) {}

  async create(cms: CreateCmsDto) {
    const createdCms = new this.cmsModel(cms);
    return createdCms.save();
  }

  async update(id: string, updateData: Partial<CMS>) {
    return this.cmsModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async findAll() {
    return this.cmsModel.find().exec();
  }

  async findOne(id: string) {
    return this.cmsModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.cmsModel.findByIdAndDelete(id).exec();
  }
}

@Injectable()
export class LogCodeCmsService {
  constructor(
    @InjectModel(LogCodeCms.name) private logCodeCmsModel: Model<LogCodeCms>,
  ) {}

  async createLogForCms(createLogCodeCmsDto: CreateLogCodeCmsDto) {
    const logCodeCms = new this.logCodeCmsModel(createLogCodeCmsDto);
    return logCodeCms.save();
  }

  async findAll(): Promise<LogCodeCms[]> {
    return this.logCodeCmsModel.find().exec();
  }
}
