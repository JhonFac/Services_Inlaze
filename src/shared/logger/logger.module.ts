// import type { DynamicModule } from "@nestjs/common";
// import { Module } from "@nestjs/common";
// import { LoggerService } from "./services/logger.service";
// import { LoggerConfigFinderService } from "./services/logger-config-finder.service";
// import type { ConfigType } from "@nestjs/config";
// import { loggerConfig, nodeConfig } from "../env";
// import { LoggerConfigModule } from "../../logger-config/logger-config.module";

// @Module({
//   imports: [LoggerConfigModule],
//   providers: [
//     {
//       provide: LoggerService,
//       useFactory: (
//         loggerEnvConfig: ConfigType<typeof loggerConfig>,
//         nodeEnvConfig: ConfigType<typeof nodeConfig>,
//         loggerConfigFinderService: LoggerConfigFinderService,
//       ): LoggerService => {
//         return new LoggerService(loggerEnvConfig, nodeEnvConfig, loggerConfigFinderService);
//       },
//       inject: [loggerConfig.KEY, nodeConfig.KEY, LoggerConfigFinderService],
//     },
//     LoggerConfigFinderService,
//   ],
//   exports: [LoggerService],
// })
// export class LoggerModule {
//   public static register({ isGlobal }: { isGlobal: boolean }): DynamicModule {
//     return {
//       module: LoggerModule,
//       global: isGlobal,
//     };
//   }
// }
