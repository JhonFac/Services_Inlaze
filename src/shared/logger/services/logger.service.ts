// import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import type {
//   AbstractLoggerData,
//   LogParams,
//   LoggerConfigModel,
// } from '@inlaze_techlead/inlaze-common';
// import { Logger, getClassName } from '@inlaze_techlead/inlaze-common';
// import type { loggerConfig, nodeConfig } from '../../env';
// import { isURL } from 'class-validator';
// import { LoggerConfigFinderService } from './logger-config-finder.service';

// @Injectable()
// export class LoggerService extends Logger {
//   error(arg0: { cls: Function; data: { message: string; stack: string; }; }) {
//     throw new Error('Method not implemented.');
//   }
//   public constructor(
//     private readonly loggerEnvConfig: ConfigType<typeof loggerConfig>,
//     private readonly nodeEnvConfig: ConfigType<typeof nodeConfig>,
//     private readonly loggerConfigFinderService: LoggerConfigFinderService,
//   ) {
//     super({
//       nodeEnv: nodeEnvConfig.nodeEnv,
//       logPath: loggerEnvConfig.logPath,
//       maxFileCount: 10,
//       maxFileSize: 1024 * 1024 * 10,
//       isEnabled: loggerEnvConfig.logger,
//     });
//   }

//   public uploadWebhook<Data extends AbstractLoggerData>(
//     data: Data,
//     loggerConfig: LoggerConfigModel,
//   ): void {
//     if (data.message.length >= this.loggerEnvConfig.loggerMaxMessageLength) return;
//     const allowUploadWebhook: boolean = this.isLevelAllowed(data.level, loggerConfig.webhookLevel);
//     if (!allowUploadWebhook || !loggerConfig.webhookUrl || !isURL(loggerConfig.webhookUrl)) return;
//     /**
//      * TODO: Implements task logic
//      */
//   }

//   public override async logMessage<Data extends AbstractLoggerData>({
//     data,
//     cls,
//   }: LogParams<Data>): Promise<void> {
//     if (!this.initialConfig.isEnabled) return;
//     const context = typeof cls === "string" ? cls : getClassName(cls);
//     const loggerConfig: LoggerConfigModel | undefined =
//       (await this.loggerConfigFinderService.findOneByContext(context ?? "")) ?? this.conf;
//     this.printMessage(data, loggerConfig, typeof cls === "function" ? getClassName(cls) : "");
//     this.uploadWebhook(data, loggerConfig);
//   }
// }
