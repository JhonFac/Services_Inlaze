import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { LogCodeCms } from './log.cms.schema';
import { Document, Types } from 'mongoose';
import {
  CMS_START,
  CMS_VALIDATE,
  CMS_IN_PROGRESS,
  CMS_PUBLISHED,
  CMS_DISABLED,
} from '../../mapping/constants/mapping.constants';

export enum CmsStatus {
  START = CMS_START,
  VALIDATE = CMS_VALIDATE,
  IN_PROGRESS = CMS_IN_PROGRESS,
  PUBLISHED = CMS_PUBLISHED,
  DISABLED = CMS_DISABLED,
}

@Schema()
export class CMS extends Document {
  @Prop({ required: true })
  idUser: string;

  @Prop({ required: true })
  currentCode: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt?: Date;

  @Prop({ type: Date, onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @Prop({ default: CmsStatus.START })
  status: CmsStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: LogCodeCms.name }] })
  logs?: LogCodeCms[];
}

export const CmsSchema = SchemaFactory.createForClass(CMS);
