import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LogCodeCms } from "./schemas/log.cms.schema";
import { CMS } from "./schemas/cms.schema";
import type { CreateCmsDto, CreateLogCodeCmsDto } from "./dtos/create-cms.dto";
import { isValidObjectId } from "mongoose";
import { CMS_NOT_FOUND } from "../mapping/constants/mapping.constants";
@Injectable()
export class CmsService {
  public constructor(
    @InjectModel(CMS.name) private readonly cmsModel: Model<CMS>,
    @InjectModel(LogCodeCms.name) private readonly logCodeCmsModel: Model<LogCodeCms>
  ) {}

  public async create(cms: CreateCmsDto) {
    const createdCms = new this.cmsModel(cms);
    return createdCms.save();
  }

  public async update(id: string, updateData: Partial<CMS>) {
    return this.cmsModel.findByIdAndUpdate(id, updateData, { new: true });
  }
  public async findAll() {
    return this.cmsModel.find().exec();
  }

  public async findOneByUserId(idUser: string) {
    return this.cmsModel.findOne({ idUser }).exec();
  }

  public async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(CMS_NOT_FOUND);
    return this.cmsModel.findById(id).exec();
  }

  public async delete(id: string) {
    return this.cmsModel.findByIdAndDelete(id).exec();
  }

  public ensureMaxLogLength(cms: CMS): void {
    if (cms.logs && cms.logs.length >= 5) {
      cms.logs.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return a.createdAt.getTime() - b.createdAt.getTime();
        }
        return 0;
      });
      cms.logs.shift();
    }
  }

  public async updateLogToCms(id: string, createLogCodeCmsDto: CreateLogCodeCmsDto){
    const cms = await this.validateUserId(id);
    this.ensureMaxLogLength(cms);
    const logCodeCms = await this.createLogForCms(createLogCodeCmsDto);
    cms.logs?.push(logCodeCms);
    return this.update(String(cms._id), { logs: cms.logs });

  }

  public async validateId(id: string) {
    const cms = await this.findOne(id);
    if (cms === null) throw new BadRequestException(CMS_NOT_FOUND);
    return cms;
  }

  public async validateUserId(id: string) {
    const cms = await this.findOneByUserId(id);
    if (cms === null) throw new BadRequestException(CMS_NOT_FOUND);
    return cms;
  }

  public async createLogForCms(createLogCodeCmsDto: CreateLogCodeCmsDto): Promise<LogCodeCms> {
    const logCodeCms = new this.logCodeCmsModel(createLogCodeCmsDto);
    return logCodeCms.save();
  }
}
