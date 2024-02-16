// import type { DynamicModule } from '@nestjs/common';
// import { Module } from '@nestjs/common';
// import { APP_FILTER } from '@nestjs/core';
// import { AllExceptionsFilter } from '../filters/exception.filter';
// import { LoggerService } from '../logger/services/logger.service';
// import { GenericExceptionsFilter } from '../filters/generic-exception.filter';
// import { HttpExceptionsFilter } from '../filters/http-exception.filter';
// import { LoggerModule } from '../logger/logger.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MongoService } from '../database/services/mongo.service';
// import { DatabasesModule } from '../database/databases.module';

// @Module({
//   imports: [
//     /** Logger */
//     LoggerModule.register({ isGlobal: true }),
//     /** Mongo */
//     MongooseModule.forRootAsync({
//       imports: [DatabasesModule],
//       inject: [MongoService],
//       useFactory: (mongoService: MongoService) => mongoService.cmsDbConfig,
//     }),
//   ],
//   providers: [
//     {
//       provide: APP_FILTER,
//       useFactory: (loggerService: LoggerService): AllExceptionsFilter => {
//         return new AllExceptionsFilter(loggerService);
//       },
//       inject: [LoggerService],
//     },
//     {
//       provide: APP_FILTER,
//       useFactory: (loggerService: LoggerService): GenericExceptionsFilter => {
//         return new GenericExceptionsFilter(loggerService);
//       },
//       inject: [LoggerService],
//     },
//     {
//       provide: APP_FILTER,
//       useFactory: (loggerService: LoggerService): HttpExceptionsFilter => {
//         return new HttpExceptionsFilter(loggerService);
//       },
//       inject: [LoggerService],
//     },
//   ],
// })
// export class ConfigModule {
//   static forRoot(): import("@nestjs/common").Type<any> | DynamicModule | Promise<DynamicModule> | import("@nestjs/common").ForwardReference<any> {
//     throw new Error('Method not implemented.');
//   }
//   public static register({ isGlobal }: { isGlobal: boolean }): DynamicModule {
//     return {
//       module: ConfigModule,
//       global: isGlobal,
//     };
//   }
// }
