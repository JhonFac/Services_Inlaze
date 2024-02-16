// import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { Catch, HttpException } from '@nestjs/common';
// import type { Request, Response } from 'express';
// import { LoggerService } from '../logger/services/logger.service';
// import type { GenericExceptionModel } from '@inlaze_techlead/inlaze-common';

// @Catch(HttpException)
// export class HttpExceptionsFilter implements ExceptionFilter<HttpException> {
//   public constructor(private readonly loggerService: LoggerService) {}

//   public catch(exception: HttpException, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response: Response = ctx.getResponse();
//     const request: Request = ctx.getRequest();

//     const status = exception.getStatus();
//     const message = exception.getResponse()['message'];
//     const { stack } = exception;
//     this.loggerService.error({
//       cls: this.constructor,
//       data: {
//         message: `Http exception in server with status code ${status}: ${message}`,
//         stack,
//       },
//     });
//     const responseJson: GenericExceptionModel<{}> = {
//       statusCode: status,
//       timestamp: Date.now(),
//       path: request.path,
//       message,
//     };
//     response.status(status).json(responseJson);
//   }
// }
