import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { originalUrl: uri, method, ip } = request;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let msg: string =
      (exception as any)?.message ||
      (status >= HttpStatus.INTERNAL_SERVER_ERROR
        ? `Service Error: ${exception}`
        : `Client Error: ${exception}`);

    if (
      Object.prototype.toString.call(response) === '[object Object]' &&
      response['message']
    ) {
      msg = response['message'];
    }

    const info = {
      uri,
      method,
      ip,
      code: status,
      exception,
    };

    this.logger.error(msg, info);

    response.status(status).json({
      error: status,
      error_msg: msg,
    });
  }
}
