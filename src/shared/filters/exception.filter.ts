// import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { Catch, HttpException, HttpStatus } from '@nestjs/common';
// import type { Request, Response } from 'express';
// import { LoggerService } from '../logger/services/logger.service';
// import type { GenericExceptionModel } from '@inlaze_techlead/inlaze-common';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   public constructor(private readonly loggerService: LoggerService) {}

//   public catch(exception: Error, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();
//     const response: Response = ctx.getResponse();
//     const request: Request = ctx.getRequest();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//     const { stack, message } = exception;
//     this.loggerService.error({
//       cls: this.constructor,
//       data: {
//         message: `Error in server with status code ${status}: ${message}`,
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
