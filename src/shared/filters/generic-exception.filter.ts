// import type { GenericExceptionModel } from '@inlaze_techlead/inlaze-common';
// import { GenericException } from '@inlaze_techlead/inlaze-common';
// import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { Catch } from '@nestjs/common';
// import type { Request, Response } from 'express';
// import { LoggerService } from '../logger/services/logger.service';

// @Catch(GenericException)
// export class GenericExceptionsFilter
//   implements ExceptionFilter<GenericException<{}>>
// {
//   public constructor(private readonly loggerService: LoggerService) {}

//   public catch(exception: GenericException<{}>, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response: Response = ctx.getResponse();
//     const request: Request = ctx.getRequest();

//     const status = exception.getStatus();
//     const { stack, message } = exception;
//     const exceptionExtraData = exception.genericOptions.extraData;
//     this.loggerService[exception.genericOptions.level ?? 'error']({
//       cls: this.constructor,
//       data: {
//         message: `Error in server with status code ${status}: ${message}`,
//         stack,
//         extraData: {
//           ...exceptionExtraData,
//           ...(exception.genericOptions.detail && {
//             detail: exception.genericOptions.detail,
//           }),
//           message,
//         },
//       },
//     });
//     const responseJson: GenericExceptionModel<{}> = {
//       statusCode: status,
//       timestamp: Date.now(),
//       path: request.path,
//       errorCode: exception.genericOptions.errorCode,
//       extraData: exception.genericOptions.extraData,
//       message,
//     };
//     response.status(status).json(responseJson);
//   }
// }
