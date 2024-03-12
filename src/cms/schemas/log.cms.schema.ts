import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class LogCodeCms extends Document {
  @Prop({ required: true })
  public code!: string;

  @Prop({ type: Date, default: () => new Date() })
  public createdAt?: Date;
}

export const LogCodeCmsSchema = SchemaFactory.createForClass(LogCodeCms);
