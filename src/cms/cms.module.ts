import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CMS, CmsSchema } from './schemas/cms.schema';
import { LogCodeCms, LogCodeCmsSchema } from './schemas/log.cms.schema';
import { CmsService, LogCodeCmsService } from './cms.service';
import { CmsController, LogCodeCmsController } from './cms.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CMS.name,
        schema: CmsSchema,
      },
      {
        name: LogCodeCms.name,
        schema: LogCodeCmsSchema,
      },
    ]),
  ],
  providers: [CmsService, LogCodeCmsService],
  controllers: [CmsController, LogCodeCmsController],
})
export class CmsModule {}
