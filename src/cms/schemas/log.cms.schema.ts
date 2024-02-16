import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LogCodeCms extends Document {
  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt?: Date;
}

export const LogCodeCmsSchema = SchemaFactory.createForClass(LogCodeCms);
