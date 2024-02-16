import { Module } from '@nestjs/common';
import { CmsModule } from '../cms/cms.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../shared/database/databases.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CmsModule],
})
export class AppModule {}
