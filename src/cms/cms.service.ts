import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogCodeCms } from './schemas/log.cms.schema';
import { CMS } from './schemas/cms.schema';
import { CreateCmsDto, CreateLogCodeCmsDto } from './dtos/create-cms.dto';
import { CMS_NOT_FOUND } from '../mapping/constants/mapping.constants';
import { isValidObjectId } from 'mongoose';

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

  async findOneByUserId(idUser: string) {
    return this.cmsModel.findOne({ idUser }).exec();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(CMS_NOT_FOUND);
    return this.cmsModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.cmsModel.findByIdAndDelete(id).exec();
  }
}
